import "./App.css";
import { useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/home/Home";
import AboutUs from "./components/AboutUs";
import { useDispatch, useSelector } from "react-redux";
import UserDashboard from "./pages/card/Dashboard";
import { logoutUser } from "./redux/reducers";
import { dashboardLoader, homePageLoader } from "./utils/loaders";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.token) {
      const autoLogOutTime = 10 * 60 * 60 * 1000; //10hrs to miliseconds.
      const timer = setTimeout(() => {
        dispatch(logoutUser());
      }, autoLogOutTime);

      return () => clearTimeout(timer);
    }
  }, [user.token, dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<HomePage />} loader={homePageLoader} />

        <Route
          path="Dashboard"
          element={<UserDashboard />}
          loader={dashboardLoader}
        />

        <Route path="about" element={<AboutUs />} />
      </Route>
    )
  );

  return (
    // <>
    //   <BrowserRouter>
    //     <Navbar></Navbar>
    //       <Routes>
    //         {user && user.user?
    //         <>
    //         {/* HomePage of logged in will be Dashboard. */}
    //           <Route path='/' element={<HomePage/>}/>
    //           <Route path='/Dashboard' element={<UserDashboard/>}/>
    //           <Route path='/about' element={<AboutUs/>}/>
    //         </>
    //         :
    //         <>
    //           <Route path='/' element={<AuthForm/>}/>
    //         </>}
    //         {/* <Route path='*' element={NotFound}/> */}
    //       </Routes>
    //   </BrowserRouter>
    // </>
    <RouterProvider router={router} />
  );
}

export default App;
