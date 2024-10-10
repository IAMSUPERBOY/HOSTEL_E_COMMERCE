import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ErrorPage from "./views/Owner/error-page.jsx";
import Purachase_Page from './views/Student/Shop/Purchase.jsx';
import AddNewHostel from "./views/Owner/AddNewHostel";
//import EditHostel from "./views/Owner/EditHostel"
//import AddNewRoom from "./views/Owner/AddNewRoom";
//import RequestPage from "./views/Owner/Request";
import Bill from './views/Student/Shop/Bill.jsx';
import Homepage from "./views/Owner/Homepage";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Checkout from './views/Student/Shop/Checkout.jsx';
import Sell_Page from './views/Student/Shop/Sell_good.jsx';
import Used_Buy from './views/Student/Shop/Sell_good.jsx';

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
  {
    path:"Student",
    element:<Purachase_Page/>,
  },
  {
    path:"Student/Checkout",
    element:<Checkout/>,
  },
  {
    path:"Student/Bill",
    element:<Bill/>,
  },
  {
    path:"Student/UsedBuy",
    element:<Used_Buy/>,
  }
    
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)