"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/app/supabaseClient";
import { useRouter } from "next/navigation";

export default function MakePostPageClient() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");

  const [user, setUser] = useState<any | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Initial auth check
    const initAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        setCheckingAuth(false);
      }
    };

    initAuth();

    // Subscribe to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Cleanup
    return () => listener.subscription.unsubscribe();
  }, []);

  // Redirect if not signed in
  useEffect(() => {
    if (!checkingAuth && !user) router.push("/signin");
  }, [checkingAuth, user, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!title || !content) {
      setMessage("Please provide title and content.");
      return;
    }

    if (!user?.id) {
      setMessage("You must be signed in to publish.");
      return;
    }

    setUploading(true);

    let image_url: string | null = null;
    let image_path: string | null = null;

    try {
      // Upload image if selected
      if (file) {
        const filename = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
        const path = `blogs/${filename}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("blog")
          .upload(path, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type || "application/octet-stream",
          });

        if (uploadError) {
          setMessage("Upload failed: " + uploadError.message);
          setUploading(false);
          return;
        }

        image_path = uploadData.path;
        const { data: publicData } = supabase.storage.from("blog").getPublicUrl(image_path);
        image_url = publicData?.publicUrl ?? null;
      }

      // Insert post into DB
      const payload = {
        title,
        content,
        category,
        image_url,
        image_path,
        author_id: user.id,
      };

      const { data: insertData, error: insertError } = await supabase
        .from("blog")
        .insert([payload])
        .select()
        .single();

      if (insertError) {
        setMessage("Insert failed: " + insertError.message);
        return;
      }

      setMessage("Blog posted successfully!");
      setTitle("");
      setContent("");
      setFile(null);
    } catch (err: any) {
      setMessage("Unexpected error: " + (err.message ?? JSON.stringify(err)));
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (checkingAuth) return <div className="p-4">Checking authentication...</div>;

  return (
    <div className="max-w-xl mx-auto p-4 text-black pt-10 pb-10">
      <h2 className="text-2xl mb-4">Create Blog Post</h2>

      {!user && (
        <div className="mb-4 text-red-600">
          You are not signed in. Please <a href="/signin" className="underline">sign in</a> to post.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 w-full border p-2 rounded"
          >
            <option value=""></option>
            <option value="Politics">Politics</option>
            <option value="Sport">Sport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Business">Business</option>
            <option value="Trend">Trend</option>
            <option value="Good News">Good News</option>
          </select>
        </div>

        <div>
          <label className="block">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 w-full border p-2 rounded"
            placeholder="Your post title"
          />
        </div>

        <div>
          <label className="block">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Write your post..."
            rows={6}
          />
        </div>

        <div>
          <label className="block">Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="border-1 border-black p-2 rounded-sm w-full" />
          {file && <p className="text-sm mt-1">Selected: {file.name}</p>}
        </div>

        <div>
          <button
            type="submit"
            disabled={uploading || !user}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Publish"}
          </button>
        </div>

        {message && <p className="mt-2 border-l-4 p-3 border-blue-600 bg-blue-200 text-blue-600">{message}</p>}
      </form>
    </div>
  );
}
