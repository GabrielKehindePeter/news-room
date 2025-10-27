"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/supabaseClient"; // ✅ make sure this path is correct

const Page = () => {
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (!error) {
      router.replace("/login");
    } else {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={signOut}
        className="bg-amber-800 text-white px-4 py-2 rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Page;
