import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          <img
            style={{ cursor: "pointer", width: "20%" }}
            src="https://res.cloudinary.com/dwkhm30wx/image/upload/v1679340948/SP-EComm/neend_g05ogi.jpg"
          ></img>
        </Link>
      </p>

      <div className="btnholder">
        <Link href="/login">
          <button
            type="button"
            style={{
              border: "none",
              backgroundColor: "transparent",
              marginRight: "20px",
              fontSize: "20px",
            }}
          >
            <CgProfile />
          </button>
        </Link>

        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </div>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
