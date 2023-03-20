import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';
import BootstrapNavbar from './NavbarBootstrap';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Major Project Furniture Store</title>
      </Head>
      <header>
        {/* <Navbar /> */}
        <BootstrapNavbar/>
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout