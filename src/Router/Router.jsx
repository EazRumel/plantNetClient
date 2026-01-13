import * as ReactDOM from "react-dom/client";
import {createBrowserRouter} from "react-router-dom";
import Home from "../Home/Home";
import SignUp from "../pages/SignUp";
import Main from "../layouts/Main/Main";



export const router = createBrowserRouter([
  {
    path:"/",
    element:<Main></Main>,
    children:[
      {
    path: "/",
    element: <Home></Home>,
  },
  {
    path:"/signUp",
    element:<SignUp></SignUp>
  }
    ]
  }
]);