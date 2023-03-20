import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Cart } from ".";
import { useStateContext } from "../context/StateContext";

const BootstrapNavbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand><Link href="/"><img style={{cursor: 'pointer'}} src='https://wakefitdev.gumlet.io/img/wakefit_blacklogo_mob.svg?w=360'></img></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
          <Nav>
            <Nav.Link><Link href="/">About Us</Link></Nav.Link>
            <Nav.Link><Link href="/">Why Us</Link></Nav.Link>
            <Nav.Link><Link href="/">Quality Assurance</Link></Nav.Link>
            <Nav.Link><Link href="/">Contact</Link></Nav.Link>
            <button
              type="button"
              className="cart-icon"
              onClick={() => setShowCart(true)}
            >
              <AiOutlineShopping />
              <span className="cart-item-qty">{totalQuantities}</span>
            </button>

            {showCart && <Cart />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BootstrapNavbar;
