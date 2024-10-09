import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ErrorPage from "./views/Owner/error-page.jsx";

import AddNewHostel from "./views/Owner/AddNewHostel";
//import EditHostel from "./views/Owner/EditHostel"
//import AddNewRoom from "./views/Owner/AddNewRoom";
//import RequestPage from "./views/Owner/Request";
import Homepage from "./views/Owner/Homepage";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element:<App page={Homepage} />,
    errorElement: <ErrorPage />,
    

  },
  {
    path: "add",
    element:<App page={AddNewHostel} />,
    errorElement: <ErrorPage />,
  },
    
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)