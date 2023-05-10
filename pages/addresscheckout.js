import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";
import toast from "react-hot-toast";

import firebaseConfig from "../lib/firebase";
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, signOut, updateEmail } from "firebase/auth";

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

let uid;

const getUID = auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
    console.log("Not signed in")
  }
});

export default function AddressCollection() {
  const router = useRouter();

  const handleCheckout = async () => {
    const query = router.query.body;
    const billing_address = JSON.stringify(billingAddress);
    const shipping_address = JSON.stringify(shippingAddress);
    const full_data = query + billing_address + shipping_address;
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        billingaddress: billing_address,
        shippingaddress: shipping_address,
        useruid: uid,
      },
      body: query,
    });

    if (response.statusCode === 500) return;

    const data = await response.json();
    // console.log(data);
    // console.log(cartItems);

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  const [billingAddress, setBillingAddress] = useState({
    name: "",
    country: "India",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pincode: "",
    state: "Karnataka",
  });

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    country: "India",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pincode: "",
    state: "Karnataka",
  });

  const [isPincodeValid, setIsPincodeValid] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);
  const [pincodeCheck, setPincodeCheck] = useState("");

  const handlePincodeChange = (event) => {
    const pincode = event.target.value;
    setPincodeCheck(pincode);
    checkPincodeValidity(pincode);
    setBillingAddress((prevAddress) => ({
      ...prevAddress,
      pincode: pincode,
    }));
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      pincode: pincode,
    }));
  };

  const checkPincodeValidity = (pincode) => {
    if (pincode >= 560000 && pincode <= 570000) {
      setIsPincodeValid(true);
    } else {
      setIsPincodeValid(false);
    }
  };

  const handleChange = (event, addressType) => {
    const { name, value, checked } = event.target;

    if (addressType === "billing") {
      setBillingAddress((prevAddress) => ({
        ...prevAddress,
        [name]: value,
      }));

      if (sameAddress) {
        setShippingAddress((prevAddress) => ({
          ...prevAddress,
          [name]: value,
        }));
      }
    } else if (addressType === "shipping") {
      setShippingAddress((prevAddress) => ({
        ...prevAddress,
        [name]: value,
      }));
    }
  };

  const handleSameAddressChange = (event) => {
    setSameAddress(event.target.checked);

    if (event.target.checked) {
      setShippingAddress(billingAddress);
      // billingAddress = shippingAddress;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    getUID();

    console.log("Billing Address:", billingAddress);
    console.log("Shipping Address:", shippingAddress);
    // Here, you can perform any further processing or API calls with the addresses
  };

  return (
    <div className="pincodeContainerAddress">
      <h1>Confirm Pincode</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <label>Pincode:</label>
        <br />
        <input
          type="text"
          maxLength={6}
          value={pincodeCheck}
          onChange={handlePincodeChange}
        />
        {isPincodeValid && (
          <>
            <br />
            <input
              type="checkbox"
              checked={sameAddress}
              onChange={handleSameAddressChange}
            />
            <label>Billing and Shipping addresses are the same</label>
            <br />
            <br />
            <br />

            <h2>Billing Address</h2>
            <label>Name:</label>
            <br />
            <input
              type="text"
              name="name"
              required
              value={billingAddress.name}
              onChange={(event) => handleChange(event, "billing")}
            />
            <br />
            <label>Address Line 1:</label>
            <br />
            <input
              required
              type="text"
              name="addressLine1"
              value={billingAddress.addressLine1}
              onChange={(event) => handleChange(event, "billing")}
            />
            <br />
            <label>Address Line 2:</label>
            <br />
            <input
              type="text"
              name="addressLine2"
              value={billingAddress.addressLine2}
              onChange={(event) => handleChange(event, "billing")}
            />
            <br />
            <label>City:</label>
            <br />
            <input
              type="text"
              required
              name="city"
              value={billingAddress.city}
              onChange={(event) => handleChange(event, "billing")}
            />
            <br />
            <label>Pincode:</label>
            <br />
            <input
              type="text"
              name="pincode"
              value={billingAddress.pincode}
              disabled
            />
            <br />
            <label>State:</label>
            <br />
            <input
              type="text"
              name="state"
              value={billingAddress.state}
              disabled
            />
            <br />
            {!sameAddress && (
              <>
                <h2>Shipping Address</h2>
                <label>Name:</label>
                <br />
                <input
                  required
                  type="text"
                  name="name"
                  value={shippingAddress.name}
                  onChange={(event) => handleChange(event, "shipping")}
                />
                <br />
                <label>Address Line 1:</label>
                <br />
                <input
                  required
                  type="text"
                  name="addressLine1"
                  value={shippingAddress.addressLine1}
                  onChange={(event) => handleChange(event, "shipping")}
                />
                <br />
                <label>Address Line 2:</label>
                <br />
                <input
                  type="text"
                  name="addressLine2"
                  value={shippingAddress.addressLine2}
                  onChange={(event) => handleChange(event, "shipping")}
                />
                <br />
                <label>City:</label>
                <br />
                <input
                  type="text"
                  required
                  name="city"
                  value={shippingAddress.city}
                  onChange={(event) => handleChange(event, "shipping")}
                />
                <br />
                <label>Pincode:</label>
                <br />
                <input
                  type="text"
                  name="pincode"
                  value={shippingAddress.pincode}
                  disabled
                />
                <br />
                <label>State:</label>
                <br />
                <input
                  type="text"
                  name="state"
                  value={shippingAddress.state}
                  disabled
                />
                <br />

                <br />
              </>
            )}
            <input
              type="submit"
              onClick={handleCheckout}
              style={{
                backgroundColor: "black",
                color: "white",
                borderRadius: "20px",
                border: "none",
                padding: "2% 4%",
                margin: "5% 0",
                cursor: "pointer",
              }}
              disabled={!isPincodeValid}
            />
          </>
        )}

        {!isPincodeValid && (
          <p className="error">Pincode should be between 560000 and 570000</p>
        )}
      </form>
    </div>
  );
}
