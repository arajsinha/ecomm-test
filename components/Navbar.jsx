import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { CgProfile, CgHeart } from "react-icons/cg";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.css";

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

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const dropdownRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  // const [display, setDisplay] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (!isMobile) {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (!isMobile) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    // Check if the user is logged in on component mount
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    if (typeof window !== "undefined" && dropdownRef.current) {
      import("bootstrap/dist/js/bootstrap.bundle").then(() => {
        dropdownRef.current.addEventListener("show.bs.dropdown", () => {
          setIsDropdownOpen(true);
        });

        dropdownRef.current.addEventListener("hide.bs.dropdown", () => {
          setIsDropdownOpen(false);
        });
      });
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        <img
          style={{ cursor: "pointer", width: "20%" }}
          src="https://res.cloudinary.com/dwkhm30wx/image/upload/v1679340948/SP-EComm/neend_g05ogi.jpg"
          alt="Logo"
        />
      </a>
      <button
        className="navbar-toggler menu-icon"
        type="button"
        onClick={handleClick}
        aria-expanded={setClick ? "true" : "false"}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        {!isMobile && (
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link className="nav-links" onClick={closeMobileMenu} href="/">
              <a href="/" className="nav-link">
                Mattresses
              </a>
            </Link>
            {dropdown && <Dropdown />}
          </li>
        )}
        <li className="nav-item">
          <Link href="/about">
            <a className="nav-link">About Us</a>
          </Link>
        </li>
        {isLoggedIn && ( // Render the wishlist icon if user is logged in
          <li className="nav-item">
            <Link href="/wishlistPage">
              <a className="nav-link">
                <CgHeart style={{ color: "red" }} />
              </a>
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link href="/loginmobile?reload=false">
            <a className="nav-link">
              <CgProfile />
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className="nav-link cart-icon"
            onClick={() => setShowCart(true)}
          >
            <AiOutlineShopping />
            <span className="cart-item-qty">{totalQuantities}</span>
          </button>
        </li>
      </ul>
      {showCart && <Cart />}
    </nav>
  );
};

export default Navbar;
