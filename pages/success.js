import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/utils";

const Success = () => {
  const router = useRouter();
  const [session_id, setSessionId] = useState("");
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  let txnDetails;

  const getSessionData = async () => {
    if (session_id && session_id !== "") {
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
      const fieldList = {};

      const productDataLayer = JSON.parse(data.metadata.productdetails)
      const billingAddress = JSON.parse(data.metadata.billingaddress)
      const shippingAddress = JSON.parse(data.metadata.shippingaddress)
      const user_uid = data.metadata.user_uid
      const shipping_amount = data.shipping_options[0].shipping_amount
      console.log(data)
      const metadataFields = {}; // Object to store the nested key-value pairs

      // Object.entries(data).forEach(([key, value]) => {
      //   if (
      //     key === "amount_subtotal" ||
      //     key === "amount_total" ||
      //     key === "metadata" ||
      //     key === "id" ||
      //     key === "customer_details"
      //   ) {
      //     fieldList[key] = value;
      //   }
      //   if (key === "metadata") {
      //     console.log("Metadata Key:", key);
      //     const processMetadata = (metadataObj, parentKey = "") => {
      //       Object.entries(metadataObj).forEach(([nestedKey, nestedValue]) => {
      //         const fullKey = parentKey
      //           ? `${parentKey}.${nestedKey}`
      //           : nestedKey;
      //         if (typeof nestedValue === "object") {
      //           processMetadata(nestedValue, fullKey); // Recursively process nested objects
      //         } else {
      //           metadataFields[fullKey] = nestedValue; // Store the key-value pair
      //         }
      //       });
      //     };

      //     const metadataValues = Object.values(value);
      //     metadataValues.forEach((metadataValue) => {
      //       try {
      //         const parsedValue = JSON.parse(metadataValue);
      //         if (typeof parsedValue === "object") {
      //           processMetadata(parsedValue);
      //         } else {
      //           console.log("Metadata Value:", parsedValue);
      //         }
      //       } catch (err) {
      //         console.log("Metadata Value:", metadataValue);
      //       }
      //     });
      //   }
      // });

      // console.log("Metadata Fields:", metadataFields); // Log the stored key-value pairs
      txnDetails = metadataFields;
      // console.log(productDataLayer)
      // Fire 'purchase' event
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "purchase",
        ecommerce: {
          purchase: {
            actionField: {
              order_id: data.id,
              user_id: user_uid,
              value: data.amount_total/100,
              shipping: shipping_amount,
              tax: data.total_details.amount_tax
            },
            products: productDataLayer
          },
        },
      });
      // console.log(txnDetails)
      // console.log("Field List:", fieldList);

      // console.log(data);
    } else {
      console.log("No session ID");
    }
  };

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  useEffect(() => {
    if (router.query.session_id) {
      setSessionId(router.query.session_id);
    }
  }, [router.query.session_id]);

  useEffect(() => {
    if (session_id !== "") {
      getSessionData();
    }
  }, [session_id]);

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
