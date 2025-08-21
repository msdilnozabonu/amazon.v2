import axios from "axios";

export async function productsData() {
  const res = await axios.get("https://fakestoreapi.com/products");
  return res.data; 
}
