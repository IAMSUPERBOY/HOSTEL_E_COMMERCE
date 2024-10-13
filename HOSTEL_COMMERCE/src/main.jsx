
import { StrictMode, useState } from 'react'; // Add useState to import
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import ErrorPage from "./views/Owner/error-page.jsx";
import Purachase_Page from "./views/Student/Shop/Purchase.jsx";
import AddNewHostel from "./views/Owner/AddNewHostel";

import Bill from './views/Student/Shop/Bill.jsx';
import OwnerHomePage from "./views/Owner/Homepage";
import BuyItems from './views/Student/BuyItems.jsx';
import OwnerStudentPage from "./views/OwnerStudentPage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Checkout from './views/Student/Shop/Checkout.jsx';
import Sell_Page from './views/Student/Shop/Sell_good.jsx';
import Used_Buy from './views/Student/Shop/Sell_good.jsx';
import StudentHomePage from './views/Student/Homepage.jsx';
import FindHostel from './views/Student/FindHostel.jsx';
import Bill from "./views/Student/Shop/Bill.jsx";
import Homepage from "./views/Owner/Homepage";
import HostelView from "./views/Student/Viewhostel.jsx";
import HostelDetails from "./views/Owner/HostelDetails.jsx";
import HostelList from "./views/Owner/HostelList.jsx";
import EditHostelDetails from "./views/Owner/EditHostel.jsx";
import RequestPage from "./views/Owner/Request.jsx";
import AddNewRoom from "./views/Owner/AddNewRoom.jsx";

function MainApp() {
  const [userType, setUserType] = useState(null); // Define userType and setUserType

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App page={OwnerStudentPage} setUserType={setUserType} />, // Pass setUserType
      errorElement: <ErrorPage />,
    },
    {
    path: "Owner",
    element: <App page={OwnerHomepage} />,
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

  return <RouterProvider router={router} />;
}


createRoot(document.getElementById("root")).render(
  <StrictMode>

    <MainApp />
  </StrictMode>,

    <RouterProvider router={router} />
  </StrictMode>

);
