import * as ReactDOM from "react-dom/client";
import {createBrowserRouter} from "react-router-dom";
import Home from "../Home/Home";
import SignUp from "../pages/SignUp";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path:"/signUp",
    element:<SignUp></SignUp>
  }
]);