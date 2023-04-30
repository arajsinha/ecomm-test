import React from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import getStripe from "../lib/getStripe";

import firebaseConfig from "../lib/firebase";
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, signOut } from "firebase/auth";

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

import { useEffect, useState } from "react";

let useremail;

const Profile = () => {
  let router = useRouter();

  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      //   localStorage.setItem("userLogin", user.email)
      useremail = user.email;
      setDisplayName(user?.displayName || "");
    });

    return unsubscribe;
  }, []);

  const handleEditClick = () => {
    setShowInput(true);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Sign-out successful");
        router.push("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const handleSaveClick = () => {
    const currentUser = auth.currentUser;
    updateProfile(auth.currentUser, {
      displayName: newDisplayName,
    })
      .then(() => {
        setDisplayName(newDisplayName);
        setShowInput(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-body" style={{ marginLeft: "3%", padding: "3%" }}>
      <div className="profile">
        <h3>Profile</h3>
        <br />
        <h5>Full Name:</h5>
        {showInput ? (
          <div>
            <input
              type="text"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
            />
            <button
              onClick={handleSaveClick}
              style={{
                border: "none",
                padding: "0.5% 3%",
                backgroundColor: "light purple",
                color: "white",
                borderRadius: "20px",
                marginLeft: "10px",
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <p id="profileName">{displayName}</p>
            <button
              onClick={handleEditClick}
              style={{
                border: "none",
                padding: "0.5% 3%",
                backgroundColor: "black",
                color: "white",
                borderRadius: "20px",
              }}
            >
              Edit
            </button>
          </div>
        )}
        <br />
        <h5>Email</h5>
        <p id="profileEmail">{user.email}</p>
        <br />
        <button
          onClick={handleLogout}
          style={{
            border: "none",
            padding: "0.5% 3%",
            backgroundColor: "red",
            color: "white",
            borderRadius: "20px",
          }}
        >
          Logout
        </button>
      </div>
      <br />
      <br />
      <div className="my-orders">
        <Link href={`/order?email=${useremail}`}>
          <button
            style={{
              border: "none",
              padding: "0.5% 3%",
              backgroundColor: "green",
              color: "white",
              borderRadius: "20px",
            }}
          >
            View Orders
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
