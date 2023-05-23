import React from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged,
} from "firebase/auth";
import firebaseConfig from "../lib/firebase";
import { initializeApp } from "firebase/app";
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

let phoneNum;
let reload;

function captchaVerify() {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
          onSignup();
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
          alert("Solve again");
        },
      },
      auth
    );
  }
}

function reloadHash() {
  if (reload === "false") {
    reload = "true";
    location.replace(`/loginmobile?reload=true`);
  }
}

export default function PhoneInputGfg() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // alert(user.email);
      router.push("/profile");
      // const displayName = user.displayName;
      // const email = user.email;
      // const photoURL = user.photoURL;
      // const emailVerified = user.emailVerified;
      // console.log(displayName, email, photoURL, emailVerified);
      //   return <div>Hi</div>;
      // ...
    } else {
      // User is not signed in.
      // ...
    }
  });

  reload = router.query.reload;
  useEffect(() => {
    // reload the page when it's loaded to reset the recaptcha token
    setTimeout(reloadHash, 1000);
  }, []);
  function onSignup() {
    phoneNum = phone;
    captchaVerify();
    const phoneNumber = "+" + phoneNum;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        setIsVerified(true);
      })
      .catch((error) => {
        window.recaptchaVerifier.render().then(function (widgetId) {
          grecaptcha.reset(widgetId);
        });
        alert("Try Verification Again");
        console.log(error);
        console.log(phoneNumber);
      });
  }

  async function confirm() {
    const otp = document.querySelector(".otpButton").value;
    console.log(otp);

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      const uid = user.uid;
      const phoneNumber = "+" + phoneNum;

      await updateUserDocument(uid, phoneNumber, uid);

      alert("User signed in successfully");
      router.push("/profile");
    } catch (error) {
      alert("User couldn't sign in");
      console.error(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    phoneNum = phone;
  }

  async function updateUserDocument(uid, phoneNumber) {
    // Initialize Firebase
    initializeApp(firebaseConfig);
  
    // Get a Firestore reference
    const firestore = getFirestore();
  
    // Create a Firestore reference to the "users" collection
    const usersCollection = collection(firestore, "users");
  
    try {
      // Check if the user document already exists
      const userDocumentSnapshot = await getDoc(doc(usersCollection, uid));
  
      if (userDocumentSnapshot.exists()) {
        console.log("User document already exists");
        return;
      }
  
      // Create the user document with the UID and phone number
      await setDoc(doc(usersCollection, uid), { uid, phoneNumber });
      console.log("User document created successfully");
    } catch (error) {
      console.error("Error creating user document:", error);
    }
  }
  

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
          <label htmlFor="phoneNum">Phone Number</label> <br />
          <PhoneInput
            country={"in"}
            value={phone}
            onChange={(phone) => setPhone(phone)}
            required
            minLength={10}
            disableCountryChange={true}
          />
          <br />
          <br />
          {/* <button
            type="submit"
            onClick={handleSubmit}
            style={{
              backgroundColor: "black",
              color: "white",
              border: "none",
              padding: "1% 5%",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Submit
          </button> */}
          <button
            onClick={onSignup}
            style={{
              backgroundColor: "black",
              color: "white",
              border: "none",
              padding: "1% 5%",
              borderRadius: "20px",
              cursor: "pointer",
              display: isVerified ? "none" : "block",
            }}
          >
            Verify
          </button>
          <div
            id="recaptcha-container"
            style={{ display: isVerified ? "none" : "block" }}
          ></div>
          <br />
          <br />
          {isVerified && (
            <div>
              <label>OTP:</label>
              <br />
              <input
                className="otpButton"
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <br />
              <br />
              {/* Add submit button for OTP verification */}
              <button
                onClick={confirm}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  padding: "1% 5%",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
