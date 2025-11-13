// app/signin/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/supabaseClient";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [authResolved, setAuthResolved] = useState(false);

  useEffect(() => {
    // If the user is already signed in, redirect them
    let initialDone = false;

    async function init() {
      try {
        const sessionResp = await supabase.auth.getSession();
        const userResp = await supabase.auth.getUser();
        const currentUser = userResp?.data?.user ?? sessionResp?.data?.session?.user ?? null;

        if (currentUser) {
          router.replace("/makepost"); // or "/dashboard"
          return;
        }
      } catch (err) {
        console.error("auth init error:", err);
      } finally {
        initialDone = true;
        // wait for the listener (below) to mark authResolved, or fallback below
      }
    }
    init();

    // subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("onAuthStateChange event:", event, session);
      if (event === "SIGNED_IN") {
        // user signed in — navigate to makepost (or dashboard)
        router.replace("/makepost");
      }
      // mark that listener ran at least once
      setAuthResolved(true);
    });

    // fallback so we don't wait forever if listener doesn't fire
    const fallback = setTimeout(() => {
      if (initialDone) setAuthResolved(true);
    }, 800);

    return () => {
      clearTimeout(fallback);
      listener?.subscription?.unsubscribe?.();
    };
  }, [router]);

  async function handlePasswordSignIn(e:any) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMsg(error.message ?? "Failed to sign in");
        console.error("Sign-in error:", error);
        return;
      }

      // If sign in succeeded, Supabase will emit onAuthStateChange -> SIGNED_IN
      // We still check for the returned user and redirect immediately if present
      const user = data?.user ?? null;
      if (user) {
        setMsg("Login successful! Redirecting...");
        router.replace("/makepost");
      } else {
        setMsg("Signed in. Waiting for session to settle...");
      }
    } catch (err) {
      console.error("Unexpected sign-in error:", err);
      setMsg("An unexpected error occurred. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  // Generic OAuth helper (provider: "github" | "google", etc.)
  async function signInWithProvider(provider:any) {
    setMsg("");
    setLoading(true);
    try {
      // prefer NEXT_PUBLIC_APP_URL if you have it set; otherwise fallback to localhost
      const redirectTo =
        (process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "http://localhost:3000") + "/makepost";

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo },
      });

      if (error) {
        console.error("OAuth error:", error);
        setMsg(error.message ?? `Failed to sign in with ${provider}`);
        return;
      }

      // For many flows Supabase handles redirect; some flows return an authorization url
      console.log(`${provider} OAuth response:`, data);
      setMsg("Redirecting to provider...");
    } catch (err) {
      console.error("Unexpected OAuth error:", err);
      setMsg("An unexpected OAuth error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto text-black">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>

      {msg && <div className="mb-4 text-blue-600">{msg}</div>}

      <form onSubmit={handlePasswordSignIn}>
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
          aria-label="email"
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
          aria-label="password"
        />

        <button
          type="submit"
          className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Submit"}
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm">Or sign in with:</p>
          <div className="flex gap-2 justify-center mt-3">
            <button
              type="button"
              onClick={() => signInWithProvider("github")}
              className="inline-flex items-center gap-2 border px-3 py-2 rounded hover:bg-gray-100"
              disabled={loading}
            >
              Sign in with GitHub
            </button>

            <button
              type="button"
              onClick={() => signInWithProvider("google")}
              className="inline-flex items-center gap-2 border px-3 py-2 rounded hover:bg-gray-100"
              disabled={loading}
            >
              Sign in with Google
            </button>
          </div>

          <p className="text-sm mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-amber-400">
              Create Account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
