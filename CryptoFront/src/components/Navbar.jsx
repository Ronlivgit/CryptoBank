import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../redux/reducers'


function Navbar() {
    const user = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const logUserOut = () => {
        dispatch(logoutUser())
        navigate('/')
    }

  return (
    <>
      {user && user.user ?
      <div className="navbar bg-gradient-to-l from-teal-500 via-teal-300 to-teal-500 sticky z-10 display: flex flex-wrap justify-evenly h-6 rounded-xl -mt-2">
      {/* <div className="navbar bg-teal-400 sticky z-10 display: flex flex-wrap justify-evenly h-6 rounded-xl -mt-2"> */}
        <nav className="flex flex-row w-full gap-2 justify-evenly text-slate-950">
        <Link to={'/'} className="btn btn-ghost text-xl">Home</Link>
        <Link to={'/Dashboard'} className="btn btn-ghost text-xl">Dashboard</Link>
        <Link to={'/about'} className="btn btn-ghost text-xl">About Us</Link>
        <div className="mr-4">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full ">
                        <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-lime-400 rounded-box w-42 ">
                {user && user.user ? 
                <>
                    <li><a>Dashboard</a></li>
                    <li><a onClick={logUserOut}>Logout</a></li>
                </> 
                :
                <>
                    <li><a>Login</a></li>
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