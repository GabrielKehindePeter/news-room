"use client";
import React, { useState } from "react";
import { supabase } from "@/app/supabaseClient";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async (e:any) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Error occurred:", error.message);
      setMsg(`Error: ${error.message}`);
      return;
    }

    if (data.user) {
      setMsg("Account successfully created! Please check your email to confirm your account.");
      console.log(data.user);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>

      {msg && <div className="mb-4 text-blue-600">{msg}</div>}

      <form onSubmit={handleSignup}>
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />

        <button type="submit" className="bg-amber-700 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
