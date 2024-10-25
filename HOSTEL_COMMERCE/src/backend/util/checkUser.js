import supabase from "./supabaseclient";

export const checkUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession(); // Get current session
  const user = session?.user;

  if (user) {
    // Fetch studentID or ownerID based on user email
    const { data: studentData } = await supabase
      .from("student")
      .select("studentid")
      .eq("email", user.email);

    if (studentData.length > 0) {
      return studentData[0].studentid;
    } else if (ownerData.length > 0) {
      return ownerData[0].ownerid;
    } else {
      // If neither student nor owner, redirect to a generic page
      window.location.replace("http://localhost:5173/login");
    }
  } else {
    // If no user session, redirect to login
    window.location.replace("http://localhost:5173/Login");
  }
};
