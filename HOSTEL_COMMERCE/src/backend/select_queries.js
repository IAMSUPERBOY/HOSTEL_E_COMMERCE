import supabase from "./supabaseclient.js";
const Student_Display=async(args)=> {
  let student, error;

  if (args.length === 1 && args[0] === "*") {
    ({ data: student, error } = await supabase.from("student").select("*"));
  } else if (args.length === 1) {
    ({ data: student, error } = await supabase
      .from("student")
      .select(args[0]));
  } else if (args.length > 1) {
    ({ data: student, error } = await supabase
      .from("student")
      .select(args.join(",")));
  }

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log(stude./supabaseclientnt);
  }
}
export default {Student_Display}
