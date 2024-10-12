import { StrictMode, useState } from 'react'; // Add useState to import
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ErrorPage from "./views/Owner/error-page.jsx";
import Purachase_Page from './views/Student/Shop/Purchase.jsx';
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

function MainApp() {
  const [userType, setUserType] = useState(null); // Define userType and setUserType

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App page={OwnerStudentPage} setUserType={setUserType} />, // Pass setUserType
      errorElement: <ErrorPage />,
    },
    {
      path: "/ownerhome",
      element: <App page={OwnerHomePage} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/studenthome",
      element: <App page={StudentHomePage} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "add",
      element: <App page={AddNewHostel} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "findhostel",
      element: <App page={FindHostel} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "buyitems",
      element: <App page={BuyItems} />,
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
      path: "student/findhostel",
      element: <App page={AddNewHostel} />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainApp />
  </StrictMode>,
);
