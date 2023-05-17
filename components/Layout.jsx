import React from "react";
import Head from "next/head";
import { client } from "../lib/client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BootstrapNavbar from "./NavbarBootstrap";
import FooterMain from "./FooterMain";

const Layout = ({ children, products }) => {
  return (
    <div className="layout">
      <Head>
        <title>Major Project Furniture Store</title>
      </Head>
      <header>
        <Navbar />

        {/* <BootstrapNavbar/> */}
      </header>
      <main className="main-container">{children}</main>
      <footer>
        {/* <FooterMain/> */}
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
