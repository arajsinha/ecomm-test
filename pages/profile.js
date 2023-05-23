import React from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import getStripe from "../lib/getStripe";

import firebaseConfig from "../lib/firebase";
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, signOut, updateEmail } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getFirestore,
} from "firebase/firestore";

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const firestore = getFirestore(firebase);

import { useEffect, useState } from "react";

let useremail;

const Profile = () => {
  let router = useRouter();

  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      //   localStorage.setItem("userLogin", user.email)
      try {
        useremail = user.email;
        // console.log(user.uid);
        // console.log(user.phoneNumber);
        setDisplayName(user?.displayName || "");
      } catch (err) {
        console.log(user.uid);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (!displayName && userData.name) {
            setDisplayName(userData.name);
          }
          if (!newEmail && userData.email) {
            setNewEmail(userData.email);
          }
        }
      }
    };

    loadUserData();
  }, [user, displayName, newEmail]);

  const handleEditClick = () => {
    setShowInput(true);
  };

  const handleEmailEditClick = () => {
    setShowEmailInput(true);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Sign-out successful");
        router.push("/loginmobile?reload=false");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const handleSaveClick = async () => {
    if (newDisplayName) {
      const currentUser = auth.currentUser;
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      }).catch((error) => {
        console.log(error);
      });
      setDisplayName(newDisplayName);

      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        await setDoc(userDocRef, { name: newDisplayName }, { merge: true });
      }
    }

    setShowInput(false);
  };

  const handleEmailSaveClick = async () => {
    if (newEmail) {
      const currentUser = auth.currentUser;
      await updateEmail(auth.currentUser, newEmail).catch((error) => {
        console.log(error);
        alert(error);
      });
      setNewEmail(currentUser.email);

      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        await setDoc(userDocRef, { email: newEmail }, { merge: true });
      }
    }

    setShowEmailInput(false);
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
        {showEmailInput ? (
          <div>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <button
              onClick={handleEmailSaveClick}
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
            <p id="profileEmail">{user.email}</p>
            <button
              onClick={handleEmailEditClick}
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
        <h5>Phone Number</h5>
        <p id="profileEmail">{user.phoneNumber}</p>
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
        <Link href={`/order`}>
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
