// app/makepost/page.tsx
"use client";

import React, { use, useEffect, useState } from "react";
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
  const [authResolved, setAuthResolved] = useState(false);

  useEffect(() => {
    let initialDone = false;
    let listenerSubscription: { unsubscribe?: () => void } | null = null;

    async function init() {
      try {
        const sessionResp = await supabase.auth.getSession();
        const userResp = await supabase.auth.getUser();
        const currentUser = userResp?.data?.user ?? sessionResp?.data?.session?.user ?? null;

        console.log("resolved currentUser id:", currentUser?.id ?? null);

        setUser(currentUser);
      } catch (err) {
        console.error("auth init error:", err);
      } finally {
        initialDone = true;
        setCheckingAuth(false);
      }
    }
    init();

    // If you want to re-enable the listener, use this (kept but safe)
    // const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    //   console.log("onAuthStateChange event:", _event, session);
    //   setUser(session?.user ?? null);
    //   setAuthResolved(true); // listener confirmed auth state
    //   setCheckingAuth(false);
    // });
    // listenerSubscription = listener?.subscription ?? null;

    // fallback so we don't wait forever if listener never fires
    const fallback = setTimeout(() => {
      if (initialDone) setAuthResolved(true);
    }, 800);

    return () => {
      clearTimeout(fallback);
      // safely unsubscribe if subscription exists
      try {
        listenerSubscription?.unsubscribe?.();
      } catch (e) {
        // ignore
      }
    };
  }, []);

  // redirect only after auth has been resolved (avoids race)
  useEffect(() => {
    if (authResolved && !user) {
      router.push("/signin");
    }
  }, [authResolved, user, router]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null);
  }

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setMessage("");
  if (!title || !content) {
    setMessage("Please provide title and content.");
    return;
  }

  // ensure current user id
  let authorId = user?.id ?? null;
  if (!authorId) {
    try {
      const { data: userData } = await supabase.auth.getUser();
      authorId = userData?.data?.user?.id ?? null;
    } catch (err) {
      console.error("error resolving user id:", err);
    }
  }
  if (!authorId) {
    setMessage("You must be signed in to publish.");
    return;
  }

  setUploading(true);
  let image_url: string | null = null;
  let image_path: string | null = null;
  let uploadedPath: string | null = null;

  try {
    // --- UPLOAD STEP (handled separately) ---
    if (file) {
      const timestamp = Date.now();
      const filename = `${timestamp}_${file.name.replace(/\s+/g, "_")}`;
      const path = `blogs/${filename}`; // <- make sure folder name is correct for your bucket

      console.log("Uploading file to storage, path:", path);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("blog")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type || "application/octet-stream",
        });

      // LOG everything about upload result so we can inspect it
      console.log("uploadData:", uploadData);
      console.log("uploadError (raw):", uploadError);
      try { console.log("uploadError (json):", JSON.stringify(uploadError, null, 2)); } catch(e){}

      if (uploadError) {
        // don't throw it as an "insert" error — handle upload error clearly
        // Common useful pieces: uploadError.status, uploadError.message
        setMessage("Upload failed: " + (uploadError.message ?? JSON.stringify(uploadError)));
        setUploading(false);
        return; // stop here; do not attempt DB insert
      }

      image_path = uploadData.path;
      uploadedPath = image_path;

      // get public url (if bucket is public) or generate signed url if needed
      const { data: publicData, error: publicErr } = supabase.storage.from("blog").getPublicUrl(image_path);
      if (publicErr) console.warn("getPublicUrl error:", publicErr);
      image_url = publicData?.publicUrl ?? null;

      console.log("Resolved image_url:", image_url, "image_path:", image_path);
    }

    // --- DB INSERT STEP ---
    // re-resolve session/user right before insert to avoid stale token
    const sessionNow = await supabase.auth.getSession();
    const userNowResp = await supabase.auth.getUser();
    const userNow = userNowResp?.data?.user ?? sessionNow?.data?.session?.user ?? null;
    authorId = userNow?.id ?? authorId;
    console.log("sessionNow:", sessionNow);
    console.log("userNow:", userNow);
    console.log("authorId used for insert:", authorId);

    const payload = {
      title,
      content,
      category,
      image_url,
      image_path,
      author_id: authorId,
    };

    console.log("Inserting payload:", payload);

    const { data: insertData, error: insertError } = await supabase
      .from("blog")
      .insert([payload])
      .select()
      .single();

    console.log("insertData:", insertData);
    console.log("insertError:", insertError);
    if (insertError) {
      // log full error then surface friendly message
      console.error("DB insert failed (full):", insertError);
      setMessage("Insert failed: " + (insertError.message ?? JSON.stringify(insertError)));
      // optionally cleanup uploaded file because insert failed
      if (uploadedPath) {
        try {
          await supabase.storage.from("blog").remove([uploadedPath]);
          console.warn("Cleaned up uploaded file:", uploadedPath);
        } catch (delErr) {
          console.error("Failed to delete uploaded file:", delErr);
        }
      }
      return;
    }

    // success
    setMessage("Blog posted successfully!");
    setTitle("");
    setContent("");
    setFile(null);
    console.log("Inserted row:", insertData);
  } catch (err) {
    // Unexpected runtime error (not uploadError/insertError)
    console.error("Unexpected error:", err);
    setMessage("Unexpected error: " + (err?.message ?? JSON.stringify(err)));
  } finally {
    setUploading(false);
  }
}


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
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border-2 w-full border p-2 rounded">
            <option value=''></option>
            <option value='Politics'>Politics</option>
            <option value='Sport'>Sport</option>
            <option value='Entertainment'>Entertainment</option>
            <option value='Business'>Business</option>
            <option value='Trend'>Trend</option>
            <option value='Good News'>Good News</option>
            
          </select>
        </div>
        <div>
          <label className="block">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 w-full border p-2 rounded" placeholder="Your post title" />
        </div>

        <div>
          <label className="block">Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full border p-2 rounded" placeholder="Write your post..." rows={6} />
        </div>

        <div>
          <label className="block">Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="border-1 border-black p-2 rounded-sm w-full"/>
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
