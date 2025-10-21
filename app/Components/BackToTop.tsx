"use client"
import { MoveUp } from 'lucide-react';
// BackToTop.jsx
import React, { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    visible && (
      <button className="backtotop bg-blue-700 text-white hover:bg-blue-900" onClick={scrollToTop}>
       <MoveUp />
      </button>
    )
  );
}
