import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";
import toast from "react-hot-toast";

import firebaseConfig from "../lib/firebase";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  updateProfile,
  signOut,
  updateEmail,
  onAuthStateChanged,
} from "firebase/auth";

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

let uid;

export default function AddressCollection() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
      } else {
        router.push("/loginmobile?reload=false");
      }
    });
  }, []);

  const pushDataLayer = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "add_shipping_info",
      ecommerce: {
        billingaddress: billingAddress,
        shippingaddress: shippingAddress,
      },
    });
  };

  const handleCheckout = async () => {
    const query = router.query.body;
    const billing_address = JSON.stringify(billingAddress);
    const shipping_address = JSON.stringify(shippingAddress);
    const stripe = await getStripe();
    let productDetails;

    let itemDetails;

    const cartData = () => {
      const cartItems = JSON.parse(query);
      itemDetails = cartItems.map((item, index) => ({
        index: index,
        name: item.name,
        original: item.original,
        price: item.price,
        quantity: item.quantity,
        slug: item.slug.current,
      }));

      // itemDetails.forEach((item) => {
      //   console.log(item);
      // });
      console.log(cartItems)
      productDetails = JSON.stringify(itemDetails);
    };

    cartData();
    pushDataLayer();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        billingaddress: billing_address,
        shippingaddress: shipping_address,
        productdetails: productDetails,
        useruid: uid,
      },
      body: query,
    });

    if (response.statusCode === 500) return;

    const data = await response.json();
    // console.log(data);
    // console.log(JSON.parse(query));

    toast.loading("Redirecting...");
    // console.log(uid);
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  const [billingAddress, setBillingAddress] = useState({
    billingName: "",
    billingCountry: "India",
    billingAddressLine1: "",
    billingAddressLine2: "",
    billingCity: "",
    billingPincode: "",
    billingState: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    shippingName: "",
    shippingCountry: "India",
    shippingAddressLine1: "",
    shippingAddressLine2: "",
    shippingCity: "Bengaluru",
    shippingPincode: "",
    shippingState: "Karnataka",
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
      billingPincode: sameAddress ? pincode : prevAddress.billingPincode,
    }));
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      shippingPincode: pincode,
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
        billingName: name === "name" ? value : prevAddress.billingName,
        billingAddressLine1:
          name === "addressLine1" ? value : prevAddress.billingAddressLine1,
        billingAddressLine2:
          name === "addressLine2" ? value : prevAddress.billingAddressLine2,
        billingCity: name === "city" ? value : prevAddress.billingCity,
        billingPincode: name === "pincode" ? value : prevAddress.billingPincode,
        billingState: checked ? value : prevAddress.billingState, // Update billingState based on checkbox state
      }));

      if (sameAddress) {
        setShippingAddress((prevAddress) => ({
          ...prevAddress,
          shippingName: name === "name" ? value : prevAddress.shippingName,
          shippingAddressLine1:
            name === "addressLine1" ? value : prevAddress.shippingAddressLine1,
          shippingAddressLine2:
            name === "addressLine2" ? value : prevAddress.shippingAddressLine2,
          shippingCity: name === "city" ? value : prevAddress.shippingCity,
          shippingState: checked ? value : prevAddress.shippingState, // Update shippingState based on checkbox state
        }));
      }
    } else if (addressType === "shipping") {
      setShippingAddress((prevAddress) => ({
        ...prevAddress,
        shippingName: name === "name" ? value : prevAddress.shippingName,
        shippingAddressLine1:
          name === "addressLine1" ? value : prevAddress.shippingAddressLine1,
        shippingAddressLine2:
          name === "addressLine2" ? value : prevAddress.shippingAddressLine2,
        shippingCity: name === "city" ? value : prevAddress.shippingCity,
        shippingState: value, // Update shippingState directly
      }));
    }
  };

  const handleSameAddressChange = (event) => {
    setSameAddress(event.target.checked);
    if (event.target.checked) {
      setBillingAddress({
        ...billingAddress,
        billingPincode: pincodeCheck,
        billingState: "Karnataka",
      });
      setShippingAddress({
        ...shippingAddress,
        shippingCity: "Bangalore",
        shippingState: "Karnataka",
      });
    } else {
      setBillingAddress({
        ...billingAddress,
        billingPincode: "",
        billingState: "",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log("Billing Address:", billingAddress);
    // console.log("Shipping Address:", shippingAddress);
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
          name="pincode"
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
              value={billingAddress.billingName}
              onChange={(event) => handleChange(event, "billing")}
            />
            <br />
            <label>Address Line 1:</label>
            <br />
            <input
              required
              type="text"
              name="addressLine1"
              value={billingAddress.billingAddressLine1}
              onChange={(event) => handleChange(event, "billing")}
            />
            <br />
            <label>Address Line 2:</label>
            <br />
            <input
              type="text"
              name="addressLine2"
              value={billingAddress.billingAddressLine2}
              onChange={(event) => handleChange(event, "billing")}
            />
            <br />
            <label>City:</label>
            <br />
            <input
              type="text"
              required
              name="city"
              value={billingAddress.billingCity}
              onChange={(event) => handleChange(event, "billing")}
              // disabled={sameAddress}
            />
            <br />
            <label>Pincode:</label>
            <br />
            <input
              type="text"
              name="pincode"
              value={billingAddress.billingPincode}
              onChange={(event) => handleChange(event, "billing")}
              disabled={sameAddress} // Correctly bind the disabled attribute
            />
            <br />
            <label>State:</label>
            <br />
            <input
              type="text"
              name="state"
              value={billingAddress.billingState}
              disabled={sameAddress}
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
                  value={shippingAddress.shippingName}
                  onChange={(event) => handleChange(event, "shipping")}
                />
                <br />
                <label>Address Line 1:</label>
                <br />
                <input
                  required
                  type="text"
                  name="addressLine1"
                  value={shippingAddress.shippingAddressLine1}
                  onChange={(event) => handleChange(event, "shipping")}
                />
                <br />
                <label>Address Line 2:</label>
                <br />
                <input
                  type="text"
                  name="addressLine2"
                  value={shippingAddress.shippingAddressLine2}
                  onChange={(event) => handleChange(event, "shipping")}
                />
                <br />
                <label>City:</label>
                <br />
                <input
                  type="text"
                  required
                  name="city"
                  value={shippingAddress.shippingCity}
                  onChange={(event) => handleChange(event, "shipping")}
                  disabled
                />
                <br />
                <label>Pincode:</label>
                <br />
                <input
                  type="text"
                  name="pincode"
                  value={shippingAddress.shippingPincode}
                  onChange={(event) => handleChange(event, "shipping")}
                  disabled
                />
                <br />
                <label>State:</label>
                <br />
                <input
                  type="text"
                  name="state"
                  value={shippingAddress.shippingState}
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
