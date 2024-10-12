import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ErrorPage from "./views/Owner/error-page.jsx";
import Purachase_Page from "./views/Student/Shop/Purchase.jsx";
import AddNewHostel from "./views/Owner/AddNewHostel";
//import EditHostel from "./views/Owner/EditHostel"
//import AddNewRoom from "./views/Owner/AddNewRoom";
//import RequestPage from "./views/Owner/Request";
import Bill from "./views/Student/Shop/Bill.jsx";
import Homepage from "./views/Owner/Homepage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Checkout from "./views/Student/Shop/Checkout.jsx";
import Sell_Page from "./views/Student/Shop/Sell_good.jsx";
import Used_Buy from "./views/Student/Shop/Sell_good.jsx";
import HostelView from "./views/Student/Viewhostel.jsx";
import HostelDetails from "./views/Owner/HostelDetails.jsx";
import HostelList from "./views/Owner/HostelList.jsx";
import EditHostelDetails from "./views/Owner/EditHostel.jsx";
import RequestPage from "./views/Owner/Request.jsx";
import AddNewRoom from "./views/Owner/AddNewRoom.jsx";

const router = createBrowserRouter([
  {
    path: "Owner",
    element: <App page={Homepage} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "Owner/add",
    element: <App page={AddNewHostel} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "Owner/ViewHostels",
    element: <App page={HostelList} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "Owner/HostelDetails/:hostelid",
    element: <App page={HostelDetails} />,
    errorElement: <ErrorPage />,
  },
  
  {
    path: "Owner/EditHostels/:hostelid",
    element: <App page={EditHostelDetails} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "Owner/AddRooms/:hostelid",
    element: <App page={AddNewRoom} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "Owner/Applications",
    element: <App page={RequestPage} />,
    errorElement: <ErrorPage />,
  },

  {
    path: "Student",
    element: <Purachase_Page />,
  },
  {
    path: "Student/Checkout",
    element: <Checkout />,
  },
  {
    path: "Student/Bill",
    element: <Bill />,
  },
  {
    path: "Student/UsedBuy",
    element: <Used_Buy />,
  },
  {
    path: "Student/hostelview",
    element: <HostelView />,
  },
  {
    path: "Hosteldetails",
    element: <HostelDetails />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
