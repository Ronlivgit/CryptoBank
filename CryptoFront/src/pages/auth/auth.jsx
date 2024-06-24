import { useState } from 'react';
import { baseUserUrl , postData } from '../../config/Api';
import { useSelector , useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers';

const AuthForm = () => {
  const [gotUser,setGotUser] = useState(false)
  const [newUser,setNewUser] = useState({})
  
  const user = useSelector((state)=> state.user)
  const dispatch = useDispatch()

  const changeHandler = (e) => {
      newUser[e.target.name] = e.target.value
      setNewUser(newUser)
  }

  const logDemoAccount = () => {
    //Login Post but make it default b@b.com , 123123
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(gotUser === false){
      const [year,month,day] = newUser.dateOfBirth.split('-')
      newUser.dateOfBirth = `${day}-${month}-${year}`
      // Register POST
    }
    else{
      // Login POST
      console.log("newUser : " , newUser);
      const res = await fetch(`${baseUserUrl}/login`,{
        method : "POST",
        body : JSON.stringify(newUser),
        headers : {
          "Content-Type" : "application/json"
        }
      })
      const finalRes = await res.json()
      console.log("user : " , finalRes);
      dispatch(setUser({user : finalRes.user , token : finalRes.token}))
      console.log("user : " , user);
      
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="max-w-[60rem] sm:w-96 md:w-[28rem] lg:w-[32rem] xl:w-[42rem] space-y-8">
        <div className="bg-gray-900 p-8 rounded-[1.3em] shadow-lg">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              {gotUser ? 'Welcome Back' : 'Create Account'}
            </h2>

          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {!gotUser && (
              <div className="rounded-md shadow-sm -space-y-px">
                  <input
                    name="firstName"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="First Name"
                    onChange={(e) => changeHandler(e)}
                  />
                  <input
                    name="lastName"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Last Name"
                    onChange={(e) => changeHandler(e)}
                  />
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
                <input
                  name="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => changeHandler(e)}
                />
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => changeHandler(e)}
                />
            </div>
            {!gotUser && (
              <div>
                <input
                  name="dateOfBirth"
                  type="date"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  onChange={(e) => changeHandler(e)}
                />
              </div>
            )}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {gotUser ? 'Login' : 'Register'}
              </button>
              <p className="mt-2 text-sm text-gray-400 text-center">
              {gotUser ? "Don't have an account yet? " : 'Already have an account?'}
              <a href="#" className="font-medium text-blue-500 hover:text-blue-400" onClick={()=>setGotUser(!gotUser)}>
                {gotUser ? ' click here to Sign up' : ' click here to Log in'}
              </a>
            </p>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a href="#" className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-gray-800 hover:bg-gray-700"
                onClick={()=>logDemoAccount()}>
                  <h1 className='size-5 w-full text-center'>Login with a demo account</h1>
                </a>
              </div>
              <div>
                <a href="#" className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-gray-800 hover:bg-gray-700">
                  <img className="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;