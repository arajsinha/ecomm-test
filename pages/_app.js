import React from "react";
import Script from "next/script";
import Head from "next/head";

import { Toaster } from "react-hot-toast";
import { Layout } from "../components";
import "/styles/globals.css";
import "/styles/fonts.css";
import { StateContext } from "../context/StateContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={"https://www.googletagmanager.com/gtag/js?id=G-1XNG744J5J"}
      />

      <Script strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-1XNG744J5J', {
        page_path: window.location.pathname,
        });
    `}
      </Script>

      {/* <Script>
        {`window.addEventListener('DOMContentLoaded', (event) => {var createPostShipCss= document.createElement('link');createPostShipCss.setAttribute('rel','stylesheet'); 
            createPostShipCss.setAttribute('href','https://kr-shipmultichannel-mum.s3-ap-south-1.amazonaws.com/shiprocket-fronted/shiprocket_post_ship.css'); 
              document.body.appendChild(createPostShipCss);
            var createPostShipScript= document.createElement('script'); 
            createPostShipScript.setAttribute('onload','changeData()');  
             createPostShipScript.setAttribute('src','https://kr-shipmultichannel-mum.s3-ap-south-1.amazonaws.com/shiprocket-fronted/shiprocket_post_ship.js');
            document.body.appendChild(createPostShipScript);});
            function changeData(){document.querySelector('.post-ship-btn').style.backgroundColor = '#745BE7'; 
            document.querySelector('.post-ship-btn').style.color = '#ffffff'; 
            document.querySelector('.post-ship-box-wrp').style.backgroundColor = '#ECECEC';  
            document.querySelector('.post-ship-box-wrp div').style.color = '#f5eeff';
            document.querySelector('.post-ship-box-wrp h1').style.color='#000000';  
            document.querySelector('.post-ship-box-wrp button').style.backgroundColor = '#745BE7';   
            document.querySelector('.post-ship-box-wrp button').style.color = '#ffffff';}
          `}
      </Script> */}

      <Head>
        <title>Welcome!</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </>
  );
}

export default MyApp;
