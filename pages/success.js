import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/utils";

const Success = () => {
  const router = useRouter();
  const session_id = router.query.session_id
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  console.log(session_id)

  const getSessionData = async (setProducts, setLoading) => {
    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${session_id}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer sk_test_51JB14ISFUaTZgP2dG5KQ620DEmj9g32f3MDKoigmSe07wvRCldYr1CsiEqhMamcI7irOxIOYLGP3jshnYm8lJxBi00yJ9D8sm2",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
    getSessionData()
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
