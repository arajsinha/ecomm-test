import React, { useRef, useState } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const router = useRouter();
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();
  const [pincode, setPincode] = useState("");
  const [isPincodeValid, setIsPincodeValid] = useState(false);

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handlePincodeBlur = () => {
    if (pincode >= 560000 && pincode <= 570000) {
      setIsPincodeValid(true);
    } else {
      setIsPincodeValid(false);
    }
  };

  // if (cartItems.length >= 1) {
  //   cartItems.forEach((item, index) => {
  //     console.log("CartItem", index, ":", item);
  //   });
  // }

  const handleCheckout = async () => {
    if (!isPincodeValid) {
      return;
    }

    // Push the begin_checkout event to the dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        checkout: {
          actionField: { step: 1, option: "Pay With Stripe" },
          products: cartItems.map((item) => ({
            item_category: item.category,
            item_name: item.name,
            price: item.price,
            quantity: item.quantity,
            slug: item.slug.current
          })),
        },
      },
    });

    setShowCart(false);
    const body = JSON.stringify(cartItems);
    // console.log(cartItems);
    // console.log(body);

    Router.push({
      pathname: "/addresscheckout",
      query: {
        body: body,
      },
    });
    // const stripe = await getStripe();

    // const response = await fetch("/api/stripe", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(cartItems),
    // });

    // if (response.statusCode === 500) return;

    // const data = await response.json();
    // console.log(data);
    // console.log(cartItems);

    // toast.loading("Redirecting...");

    // stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef} style={{ height: "100vh" }}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        <br />
        <div className="pincode-container">
          <label htmlFor="pincode">Enter pincode:</label>
          <input
            type="text"
            maxLength={6}
            id="pincode"
            name="pincode"
            value={pincode}
            onChange={handlePincodeChange}
            onBlur={handlePincodeBlur}
          />
          {!isPincodeValid && (
            <p className="error">
              Currently Not delivering to Pincodes outside 560000 and 570000.
            </p>
          )}
          {isPincodeValid && pincode >= 560000 && pincode <= 565555 && (
            <p className="delivery">Delivery within 2 Days</p>
          )}
          {isPincodeValid && pincode >= 565556 && pincode <= 570000 && (
            <p className="delivery">Delivery within 5 Days</p>
          )}
        </div>
        {/* <p className="error">Nice</p> */}
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div
          className="product-container"
          style={{ overflowY: "auto", paddingBottom: "10rem" }}
        >
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                {/* {console.log(item._id)} */}
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="top">
                    <h5>{item.name}</h5>
                    <h4 style={{color: "green"}}>₹{item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num" onClick="">
                          {item.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>₹{totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="btn"
                onClick={handleCheckout}
                disabled={!isPincodeValid}
                style={{ color: "white" }}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
