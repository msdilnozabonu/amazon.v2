import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
  resetCart,
} from "../redux/amazonSlice";
import emptyCart from "../assets/emptyCart.png";

const CartPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.amazon.products);
  const [totalPrice, setTotalPrice] = useState("0.00");

  useEffect(() => {
    let total = 0;
    products.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total.toFixed(2));
  }, [products]);

  return (
    <div className="w-full bg-gray-100 p-4">
      {products.length > 0 ? (
        <div className="container mx-auto h-auto grid grid-cols-5 gap-8">
          <div className="w-full h-full bg-white px-4 col-span-4">
            <div className="font-titleFont flex items-center justify-between border-b border-gray-400 py-3">
              <h2 className="text-3xl font-medium">Shopping Cart</h2>
              <h4 className="text-xl font-normal">Subtitle</h4>
            </div>

            <div>
              {products.map((item) => (
                <div
                  key={item.id}
                  className="w-full border-b border-gray-300 p-4 flex items-center gap-6"
                >
                  <div className="w-1/5">
                    <img
                      className="w-full h-44 object-contain"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>

                  <div className="w-4/5">
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-sm">
                      {item.description.substring(0, 200)}
                    </p>
                    <p className="text-base">
                      Unit Price{" "}
                      <span className="font-semibold">${item.price}</span>
                    </p>
                    <div className="bg-[#F0F2F2] flex justify-center items-center gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md">
                      <p>Qty:</p>
                      <p
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300"
                      >
                        -
                      </p>
                      <p>{item.quantity}</p>
                      <p
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300"
                      >
                        +
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch(deleteItem(item.id))}
                      className="bg-red-500 w-36 py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300"
                    >
                      Delete Item
                    </button>
                  </div>
                  <div>
                    <p className="text-lg font-titleFont font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full py-2">
              <button
                onClick={() => dispatch(resetCart())}
                className="px-10 py-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg font-titleFont font-semibold text-lg tracking-wide"
              >
                Clear Cart
              </button>
            </div>
          </div>

          <div className="w-full h-full bg-white col-span-1 flex flex-col justify-center items-center p-4">
            <p className="flex gap-2 items-start text-sm">
              <span>
                <CheckCircleIcon className="text-green-500" />
              </span>
              Your order qualifies for FREE Shipping. Choose this option at
              checkout. See details...
            </p>

            <p className="font-semibold px-10 py-1 flex items-center gap-2 justify-between">
              Total: <span className="text-lg font-bold">${totalPrice}</span>
            </p>

            <button
              className="w-full font-titleFont font-medium text-base bg-gradient-to-tr 
              from-yellow-400 to-yellow-200 border border-yellow-500 
              hover:from-yellow-300 hover:to-yellow-100 hover:border-yellow-700 
              active:from-yellow-400 active:to-yellow-500 
              duration-200 py-1.5 rounded-md mt-3"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      ) : (
       <div className="">
  <div className="container mx-auto h-auto flex items-center justify-center py-10 flex-row gap-6">
    <img
      className="w-80 rounded-lg p-4"
      src={emptyCart}
      alt="emptyCartImg"
    />
    <div className="w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg">
      <h1 className="font-titleFont text-xl font-bold">
        Your Cart feels lonely.
      </h1>
      <p className="text-sm text-center">
        Your Shopping cart lives to serve. Give it purpose – fill it with
        books, electronics, videos, etc. and make it happy.
      </p>
      <button className="mt-6 bg-yellow-400 rounded-md py-2 px-8 text-lg font-titleFont font-semibold cursor-pointer hover:bg-yellow-500 active:bg-yellow-700">
        Continue Shopping
      </button>
    </div>
  </div>
</div>

      )}
    </div>
  );
};

export default CartPage;
