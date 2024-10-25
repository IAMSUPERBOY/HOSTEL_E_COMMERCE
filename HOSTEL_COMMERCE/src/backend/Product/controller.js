import supabase from "../util/supabaseclient";

export const Product_List_Vendors = async () => {
  let { data: new_products, error } = await supabase.from("new_products")
    .select(`
        *,
        vendors(
          vendorname,
          verified,
          state
        )
      `);

  if (error) {
    console.log(error);
  }
  return new_products;
};

export const Product_List_Student = async () => {
  let { data: used_products, error } = await supabase.from("used_products")
    .select(`
        *,
        student(
          studentfname
        )
      `);

  if (error) {
    console.log(error);
  }
  return used_products;
};
export const Add_to_Cart = async (studentid, productid) => {
  console.log(studentid);
  let { data: cart, e1 } = await supabase
    .from("carts")
    .select(
      `
  cartid,studentid
`
    )
    .eq("studentid", studentid);
  console.log(cart);
  if (e1) {
    console.log(e1);
  }

  const cartid = cart[0].cartid;

  await supabase
    .from("cart_items")
    .insert([{ cartid: cartid, productid: productid }]);
};

export const Get_Cart = async (studentid) => {
  let { data: cart, error } = await supabase
    .from("carts")
    .select(
      `
    cartid,
    cart_items (
      productid
    )
  `
    )
    .eq("studentid", studentid);

  if (error) {
    console.log(error);
  }
  return cart;
};
/* export const Get_Vendor_Names = async (vendorid) => {
  let { data: Vendors, error } = await supabase.from("new_products").select(`
  vendors(
    vendorname,
    verified,
    state
  )
`);
};
 */
export const Prod_details = async (productid) => {
  let { data: product, error } = await supabase.from("new_products")
    .select(`
          *,
          vendors(
            vendorname,
            verified,
            state
          )
        `).eq("productid",productid);

  if (error) {
    console.log(error);
  }
  return product[0];
};


// backend/Product/controller.js


export const Delete_Cart_Items = async (cartId) => {
  try {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("cartid", cartId); // Deletes all rows with the matching cartid

    if (error) throw error;

    console.log("Cart items deleted successfully.");
    return { success: true };
  } catch (error) {
    console.error("Error deleting cart items:", error);
    return { success: false, error: error.message };
  }
};

