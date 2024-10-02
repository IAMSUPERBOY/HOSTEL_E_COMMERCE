import { useState } from "react";
import AddNewHostel from "./views/Owner/AddNewHostel";
import EditHostel from "./views/Owner/EditHostel"
import AddNewRoom from "./views/Owner/AddNewRoom";

import "./App.css";

function App() {
  return( 
  <><h1 className="text-3xl font-mono underline">Hello world!</h1>
 <AddNewHostel />
 <AddNewRoom />
 <EditHostel />

 </>
  

)
}

export default App;

