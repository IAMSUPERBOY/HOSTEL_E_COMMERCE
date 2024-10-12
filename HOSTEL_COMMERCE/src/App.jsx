import { useState } from "react";
import OwnerNavbar from "./views/Owner/Navbar";
import StudentNavbar from "./views/Student/Navbar";
import Footer from "./views/Student/Footer"; // Assuming both Owner and Student have the same Footer
import OwnerHomePage from "./views/Owner/Homepage";
import StudentHomePage from "./views/Student/Homepage";
import OwnerStudentPage from "./views/OwnerStudentPage.jsx"; // This is where setUserType is used

function App({ page: PageComponent }) {
  // State to manage the user type
  const [userType, setUserType] = useState(null); // Initially null, not selected

  // Check if the component passed is OwnerStudentPage
  const isOwnerStudentPage = PageComponent === OwnerStudentPage;

  // Conditionally render the navbar based on userType
  const renderNavbar = () => {
    console.log(userType);
    if (userType === "owner") {
      return <OwnerNavbar />;
    } else if (userType === "student") {
      return <StudentNavbar />;
    }
    return null; // No navbar if the user hasn't selected yet
  };

  return (
    <>
      {!isOwnerStudentPage && renderNavbar()} {/* Render Navbar based on user type */}
      {PageComponent && (
        <PageComponent setUserType={setUserType} /> 
      )}
      {!isOwnerStudentPage && <Footer />} {/* Render Footer only if it's not OwnerStudentPage */}
    </>
  );
}

export default App;
