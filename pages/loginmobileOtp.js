import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import firebaseConfig from "../lib/firebase";
import { initializeApp } from "firebase/app";
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

const PhoneInputGfg = () => {
  function nicer() {}
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    router.push({
      pathname: "/phoneOtp",
      query: { phone: phone },
    });
  };

  return (
    <div className="body-wrap" style={{ height: "60vh" }}>
      <div
        className="login-form"
        style={{
          marginTop: "10%",
          marginBottom: "2%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="log-in"
          style={{
            backgroundColor: "#eee8ff",
            padding: "3%",
            borderRadius: "20px",
          }}
        >
          <form onSubmit={handleFormSubmit}>
            <br />
            <label htmlFor="phoneOtp">OTP</label>
            <br />
            <input
              className="OTP"
              type="text"
              minLength="6"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <br />
            <br />
            <br />
            <input
              type="submit"
              value="Submit"
              style={{
                backgroundColor: "black",
                color: "white",
                border: "none",
                padding: "1% 5%",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            />
          </form>
        </div>
      </div>
      <Link href="/signup">
        <a
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Not an Existing User? Sign Up
        </a>
      </Link>
    </div>
  );
};

export default PhoneInputGfg;
