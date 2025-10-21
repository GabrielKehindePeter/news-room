import React from 'react'

const Navbar = () => {
  return (
    <>
        <div className="navbar bg-gray-100 shadow-sm text-blue-600">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>Home</a></li>
        <li>
          <a>Trending</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Entertainment</a></li>
        <li><a>Politics</a></li>
        <li><a>Events</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">News Room</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
       <li><a>Home</a></li>
      <li>
        <details>
          <summary>Trending</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
     <li><a>Entertainment</a></li>
        <li><a>Politics</a></li>
        <li><a>Events</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn rounded-xl border-0 bg-blue-600">
        
    <svg className="h-[1em] opacity-100 text-2xl" xmlns="#" viewBox="0 0 24 24">
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


    </a>
  </div>
</div>
    </>
  )
}

export default Navbar