import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { CgProfile, CgHeart } from "react-icons/cg";
import { Product } from "./";
import { client } from "../lib/client";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import handleData, { getData } from "../components/dataHandler";

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
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const hoverNavbarRef = useRef(null);
  const router = useRouter();
  const testdata = getData();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isHoveringHoverNavbar, setIsHoveringHoverNavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
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
  }, []);

  const handleDropdownHover = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    // setIsDropdownOpen(false);
    if (!isHoveringHoverNavbar) {
      setIsDropdownOpen(false);
    }
  };

  const handleHoverNavbarEnter = () => {
    setIsHoveringHoverNavbar(true);
  };

  const handleHoverNavbarLeave = () => {
    setIsHoveringHoverNavbar(false);
  };

  const handleHoverNavbarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link href="/">
        <a className="navbar-brand">
          <img
            style={{ cursor: "pointer", width: "20%" }}
            src="https://res.cloudinary.com/dwkhm30wx/image/upload/v1679340948/SP-EComm/neend_g05ogi.jpg"
            alt="Logo"
          />
        </a>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNav}
        aria-expanded={isNavOpen ? "true" : "false"}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`collapse navbar-collapse align-right ${
          isNavOpen ? "show" : ""
        }`}
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a
              ref={dropdownRef}
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen || isHoveringHoverNavbar}
              onMouseEnter={handleDropdownHover}
              onMouseLeave={handleDropdownLeave}
            >
              Mattresses
            </a>
            {isDropdownOpen && (
              <div
                className="hoverNavbar"
                ref={hoverNavbarRef}
                onMouseEnter={handleHoverNavbarEnter}
                onMouseLeave={handleHoverNavbarLeave}
                onClick={handleHoverNavbarClick}
              >
                <ul>
                  {testdata &&
                    testdata.map((product, index) => (
                      <div key={index}>
                        <li>
                          <Link
                            className="hoverLink"
                            href={`/products/${product.slug?.current}`}
                            style={{ color: "black" }}
                          >
                            {product.name}
                          </Link>
                        </li>
                      </div>
                    ))}
                </ul>
              </div>
            )}
          </li>
        </ul>{" "}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link href="#info">
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
      </div>

      {showCart && <Cart />}
    </nav>
  );
};

export default Navbar;
