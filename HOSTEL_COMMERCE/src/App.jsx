import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Navbar from "./views/Owner/Navbar"
import Footer from "./views/Owner/Footer"
import AddNewHostel from "./views/Owner/AddNewHostel";
import EditHostel from "./views/Owner/EditHostel"
import AddNewRoom from "./views/Owner/AddNewRoom";
import RequestPage from "./views/Owner/Request";
import OwnerRegisration from "./views/Owner/OwnerRegistration";


//import AddNewHostel from "./views/Owner/AddNewHostel";
//import EditHostel from "./views/Owner/EditHostel"
//import AddNewRoom from "./views/Owner/AddNewRoom";
//import RequestPage from "./views/Owner/Request";
import Homepage from "./views/Owner/Homepage";
function App() {
  return( 
  <>
  <OwnerRegisration />
 </>

import "./App.css";

function App({ page: PageComponent }) {
  return (
    <>
      <Navbar />
      <PageComponent /> {/* Dynamically rendering the component */}
      <Footer />
    </>
  );
}

export default App;