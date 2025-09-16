import * as ReactDOM from "react-dom/client";
import {createBrowserRouter} from "react-router-dom";
import Home from "../Home/Home";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
]);