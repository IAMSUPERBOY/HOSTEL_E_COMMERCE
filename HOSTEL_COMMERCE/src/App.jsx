import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Navbar from "./views/Owner/Navbar";
import Footer from "./views/Owner/Footer";
import AddNewHostel from "./views/Owner/AddNewHostel";
import EditHostel from "./views/Owner/EditHostel";
import AddNewRoom from "./views/Owner/AddNewRoom";
import RequestPage from "./views/Owner/Request";
import OwnerRegisration from "./views/Owner/OwnerRegistration";
import StudentRegisration from "./views/Student/StudentRegistration";
import Purachase_Page from "./views/Student/Shop/Purchase";
import "./App.css";

//import AddNewHostel from "./views/Owner/AddNewHostel";
//import EditHostel from "./views/Owner/EditHostel"
//import AddNewRoom from "./views/Owner/AddNewRoom";
//import RequestPage from "./views/Owner/Request";
import Homepage from "./views/Owner/Homepage";
/* function App() {
  return( 
  <>
  <StudentRegisration/>
 </>
 */
let Page = 1;
function App({ page: PageComponent }) {
  return (
    <>
      {Page && (
        <>
          <Navbar />
          <PageComponent /> {/* Dynamically rendering the component */}
          <Footer />
        </>
      )}
      {}
    </>
  );
}

export default App;
