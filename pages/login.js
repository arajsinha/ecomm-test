import React from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import firebaseConfig from "../lib/firebase";
import { initializeApp } from "firebase/app";
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

// const user = userCredential.user;



const passwordReset = () => {
  let email = document.getElementById("logEmail").value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password Reset Email Sent!");
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

const logUserPassword = () => {
  let email = document.getElementById("logEmail").value;
  let pass = document.getElementById("logPass").value;

  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(email + " signed in");
      console.log(user);
      console.log(user.uid);
      // checkUser()
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("User Does Not Exist, or email/password is incorrect");
      // ..
    });
};

const loginPage = () => {
  let router = useRouter();
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
  return (
    <div className="body-wrap" style={{ height: "100vh" }}>
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
          <label htmlFor="logEmail">Email</label> <br />
          <input
            required
            type="text"
            name="logEmail"
            id="logEmail"
            style={{
              border: "none",
              borderRadius: "20px",
              padding: "5px",
              margin: "5px 0",
            }}
          />{" "}
          <br /> <br />
          <label htmlFor="logPass">Password</label> <br />
          <input
            required
            type="password"
            name="logPass"
            id="logPass"
            style={{
              border: "none",
              borderRadius: "20px",
              padding: "5px",
              margin: "5px 0",
            }}
          />{" "}
          <br />
          <p
            onClick={passwordReset}
            style={{ fontSize: "12px", textAlign: "end", color: "#6836f2" }}
          >
            Forgot Password?
          </p>{" "}
          <br />
          <input
            type="submit"
            value="Submit"
            onClick={logUserPassword}
            style={{
              backgroundColor: "black",
              color: "white",
              border: "none",
              padding: "1% 5%",
              borderRadius: "20px",
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex" }} className="mobile-login">
        <Link href="/loginmobile?reload=false">
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              border: "none",
              padding: "1% 5%",
              borderRadius: "20px",
              margin: "1% auto 2% auto",
              // transform: "translateX(-50%)"
            }}
          >
            Login with Phone Number
          </button>
        </Link>
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

export default loginPage;
