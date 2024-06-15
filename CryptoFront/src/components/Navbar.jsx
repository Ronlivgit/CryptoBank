import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
  return (
    <div className="navbar bg-base-100 sticky z-10 display: flex flex-wrap justify-around h-6 rounded-xl -mt-2">
    <div className="">
        <Link to={'/'} className="btn btn-ghost text-xl">Home</Link>
    </div>
    <div className="">
        <Link to={'/loans'} className="btn btn-ghost text-xl">Loans</Link>
    </div>
    <div className="">
        <Link to={'/about'} className="btn btn-ghost text-xl">About Us</Link>
    </div>
    <div className="flex-none absolute right-48">
        <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-42">
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
        </ul>
        </div>
    </div>
    </div>
  )
}

export default Navbar