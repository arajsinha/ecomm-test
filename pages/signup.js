import React from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import firebaseConfig from "../lib/firebase";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);


const signupPage = () => {
  let router = useRouter();

  const createUserPassword = () => {
    let email = document.getElementById("createEmail").value;
    let pass = document.getElementById("createPass").value;
  
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(email + " signed in");
        router.push('/profile');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  

  return (
    <div className="body-wrap" style={{ height: "50vh" }}>
      <div
        className="signup-form"
        style={{
          marginTop: "10%",
          marginBottom: "2%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="sign-up"
          style={{
            backgroundColor: "#eee8ff",
            padding: "3%",
            borderRadius: "20px",
          }}
        >
          <label htmlFor="createEmail">Email</label> <br />
          <input
            required
            type="text"
            name="createEmail"
            id="createEmail"
            style={{
              border: "none",
              borderRadius: "20px",
              padding: "5px",
              margin: "5px 0",
            }}
          />{" "}
          <br /> <br />
          <label htmlFor="createPass">Password</label> <br />
          <input
            required
            type="password"
            name="createPass"
            id="createPass"
            style={{
              border: "none",
              borderRadius: "20px",
              padding: "5px",
              margin: "5px 0",
            }}
          />{" "}
          <br />
          <br />
          <input
            type="submit"
            value="Submit"
            onClick={createUserPassword}
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
      <Link href="/login">
        <a
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Existing User? Log In
        </a>
      </Link>
    </div>
  );
};

export default signupPage;
