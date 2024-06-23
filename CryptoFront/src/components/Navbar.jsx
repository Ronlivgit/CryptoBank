import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AuthForm from '../pages/auth/auth'


function Navbar() {
    const user = useSelector((state)=> state.user)
  return (
    <>
      {user && user.user ?  
      <div className="navbar bg-slate-800 sticky z-10 display: flex flex-wrap justify-around h-6 rounded-xl -mt-2">
        <nav className="flex flex-row w-full gap-2 justify-between text-white">
        <Link to={'/'} className="btn btn-ghost text-xl">Home</Link>
        <Link to={'/loans'} className="btn btn-ghost text-xl">Loans</Link>
        <Link to={'/about'} className="btn btn-ghost text-xl">About Us</Link>
        <div className="mr-4">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-42">
                {user && user.user ? 
                <>
                    <li><a>Login</a></li>
                </> 
                :
                <>
                    <li><a>Dashboard</a></li>
                    <li><a>Logout</a></li>
                </>}
                </ul>
            </div>
        </div>
        </nav>
    </div>
    :<>
    </>}
    </>
  )
}

export default Navbar