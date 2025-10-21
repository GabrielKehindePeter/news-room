"use client"

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
      <button className="backtotop bg-amber-400 text-white hover:bg-amber-600" onClick={scrollToTop}>
        {/* <i className="bi bi-arrow-up"></i> */}
        U
      </button>
    )
  );
}
