import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";
import HeroImageBanner from "../components/HeroImageBanner";
import HappyStrip from "../components/HappyStrip";
import Info from "../components/Info";
import FooterMain from "../components/FooterMain";
import Category from "../components/Category";

const Home = ({ products, bannerData }) => (
  
  <div>
  {/* {console.log(products)} */}
    {/* <HeroBanner heroBanner={bannerData.length && bannerData[0]}  /> */}
    <HeroImageBanner heroBanner={bannerData.length && bannerData[0]} />
    <HappyStrip />
    {/* {console.log("bannerdata length is")} */}
    {/* {console.log(bannerData[0])} */}
    <div className="products-heading">
      <h2>Shop Our Collection</h2>
      {/* <p>We have some amazing products</p> */}
    </div>

    <div className="products-container">
      {products?.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>

<hr/>

    <div className="products-heading category-heading">
      <h2>Shop By Categories</h2>
    </div>
    <div className="products-container category-container">
      <Category/>
    </div>

    <Info />
    {/* <FooterBanner footerBanner={bannerData && bannerData[0]} /> */}
    <FooterMain />
  </div>
);

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
