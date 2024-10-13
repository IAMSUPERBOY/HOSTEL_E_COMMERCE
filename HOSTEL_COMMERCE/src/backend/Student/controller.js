import supabase from "../util/supabaseclient";
import { Get_Cart, Prod_details } from "../Product/controller";
export const Gen_Bill = async (studentid) => {
  let totalPrice = 0;
  Get_Cart(studentid)
    .then(async (data) => {
      await data[0].cart_items.forEach(async (item) => {
        Prod_details(item.productid).then((product) => {
          totalPrice = totalPrice + product.price;
        });
      });
    })
    .then(() => {
      console.log(totalPrice);
    });

  const cart = await Get_Cart(studentid);
  const promises = await cart[0].cart_items.map(async (item) => {
    const prod = await Prod_details(item.productid);
    totalPrice += prod.price;
  });
  await Promise.all(promises);
  return totalPrice;
};

export const Consume_Item = async (productid, used) => {
  //write code to delete item from new_products table
};

export const ApplicationRequest = async (application, hostelid, studentid) => {
  // Fetch the largest application ID
  let { data: maxapplicationid, error: apperror } = await supabase
    .from("application")
    .select("id")
    .order("id", { ascending: false })
    .limit(1);

  if (apperror) {
    console.error("Error fetching max application ID:", apperror);
    throw apperror;
  }

  const newId = maxapplicationid.length > 0 ? maxapplicationid[0].id + 1 : 1; // Increment max ID or start from 1 if table is empty

  // Insert the new application entry
  const { data, error } = await supabase.from("application").insert([
    {
      id: newId,
      content: application.content,
      type: "JoinRequest",
      status: "pending",
      hostelid: hostelid,
      roomid: application.roomid,
      studentid: studentid,
      application_date: new Date().toISOString(), // Use current timestamp
    },
  ]);

  if (error) {
    console.error("Error inserting application:", error);
    throw error; // Throw the error to be handled in the frontend
  }

  return data; // Return the inserted data (optional)
};

export async function AddUsedProduct(owner) {
  

  const { data, error } = await supabase.from("used_products").insert([
    {
      productname : owner.productname,
      category: owner.category,
      price: owner.price,
      studentid: owner.studentid,
      
    },
  ]);

  if (error) {
    console.error("Error inserting hostel:", error);
    throw error; // Throw the error to be handled in the frontend
  }

  return data; // Return the inserted data (optional)
}

