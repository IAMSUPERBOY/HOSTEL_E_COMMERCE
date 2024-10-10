import supabase from "../util/supabaseclient";
import { Get_Cart, Prod_details } from "../Product/controller";
export const Gen_Bill = async (studentid) => {
  let totalPrice = 0;
  Get_Cart(studentid)
    .then(async(data) => {
     await data[0].cart_items.forEach(async(item) => {
        Prod_details(item.productid).then((product) => {
          totalPrice = totalPrice + product.price;
        });
      });
    })
    .then(() => {
      console.log(totalPrice);
    });

    const cart=await Get_Cart(studentid);
    const promises=await cart[0].cart_items.map(async(item) => {
      const prod=await Prod_details(item.productid);
      totalPrice+=prod.price;
      });
      await Promise.all(promises);
      return totalPrice
};

export const Consume_Item=async(productid,used)=>{
    //write code to delete item from new_products table 
    
}
