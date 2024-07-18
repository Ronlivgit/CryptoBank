import "./App.css";
import { useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/home/Home";
import Invest from "./pages/invest/Invest";
import { useDispatch, useSelector } from "react-redux";
import UserDashboard from "./pages/dashboard/Dashboard";
import { logoutUser } from "./redux/reducers";
import { dashboardLoader, homePageLoader, investPageLoader } from "./utils/loaders";
import AuthPage from "./pages/auth/auth";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.token) {
      const autoLogOutTime = 1 * 60 * 60 * 1000; //1hrs to miliseconds.
      const timer = setTimeout(() => {
        dispatch(logoutUser());
      }, autoLogOutTime);
      return () => clearTimeout(timer);
    }
  }, [user.token, dispatch]);

  const routes = user.user ? (
    <Route path="/">
      <Route index element={<HomePage />} loader={homePageLoader} />
      <Route
        path="Dashboard"
        element={<UserDashboard />}
        loader={dashboardLoader}
      />
      <Route path="Invest" element={<Invest />} loader={investPageLoader}/>
    </Route>
  ) : (
    <Route path="/">
      <Route index element={<AuthPage />} />
    </Route>
  );

  const router = createBrowserRouter(createRoutesFromElements(routes));

  return (
    // <>
    //   <BrowserRouter>
    //     <Navbar></Navbar>
    //       <Routes>
    //         {user && user.user?
    //         <>
    //           <Route path='/' element={<HomePage/>}/>
    //           <Route path='/Dashboard' element={<UserDashboard/>}/>
    //           <Route path='/about' element={<AboutUs/>}/>
    //         </>
    //         :
    //         <>
    //           <Route path='/' element={<AuthPage/>}/>
    //         </>}
    //         {/* <Route path='*' element={NotFound}/> */}
    //       </Routes>
    //   </BrowserRouter>
    // </>
    <RouterProvider router={router} />
  );
}

export default App;
