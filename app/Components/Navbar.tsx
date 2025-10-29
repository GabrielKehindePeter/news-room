"use client";
import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // prevent body scroll when offcanvas is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="navbar bg-gray-200 shadow-sm text-blue-700">
        <div className="navbar-start">
          <div className="lg:hidden">
            {/* Mobile toggle - opens offcanvas */}
            <button
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="btn btn-ghost"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
          </div>

          <a className="btn btn-ghost text-xl text-blue-700">News Room</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-gray-900"> {/* explicit text color */}
            <li>
              <a className="text-inherit">Home</a>
            </li>
            <li>
              <details>
                <summary className="cursor-pointer">Trending</summary>
                <ul className="p-2 w-60 bg-gray-100 rounded-t-none">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Entertainment</a>
            </li>
            <li>
              <a>Politics</a>
            </li>
            <li>
              <a>Events</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {/* search field */}
         <label className="input border-2 border-blue-400 bg-white rounded-lg lg:w-60 sm:w-5 md:w-60">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" />
        </label>
        </div>
      </div>

      {/* Render offcanvas only when open to avoid interfering visuals */}
      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity duration-300"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <aside
            className="fixed left-0 top-0 h-full w-100 max-w-full bg-white shadow-xl transform translate-x-0 transition-transform duration-300"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between p-4 border-b text-blue-900">
              <h3 className="text-lg font-semibold">News Room</h3>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="btn btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="p-4 text-blue-900">
              <ul className="space-y-2">
                <li>
                  <a className="block py-2 px-3 rounded hover:bg-gray-100">Home</a>
                </li>

                <li>
                  <details className="group">
                    <summary className="cursor-pointer py-2 px-3 rounded hover:bg-gray-100">
                      Trending
                    </summary>
                    <ul className="mt-2 ml-4 space-y-1">
                      <li>
                        <a className="block py-1 px-2 rounded hover:bg-gray-100">Submenu 1</a>
                      </li>
                      <li>
                        <a className="block py-1 px-2 rounded hover:bg-gray-100">Submenu 2</a>
                      </li>
                    </ul>
                  </details>
                </li>

                <li>
                  <a className="block py-2 px-3 rounded hover:bg-gray-100">Entertainment</a>
                </li>

                <li>
                  <a className="block py-2 px-3 rounded hover:bg-gray-100">Politics</a>
                </li>

                <li>
                  <a className="block py-2 px-3 rounded hover:bg-gray-100">Events</a>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
