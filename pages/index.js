import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleData } from "../components/dataHandler";
import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";
import NeendBanner from "../components/NeendBanner";
import Widget from "../components/Widget";
import HeroImageBanner from "../components/HeroImageBanner";
import HappyStrip from "../components/HappyStrip";
import Info from "../components/Info";
import FooterMain from "../components/FooterMain";
import Category from "../components/Category";
import Link from "next/link";

const Home = ({ products, bannerData }) => {
  //For NeendBanner
  console.log("bannerData:", bannerData)
  const [images, setImages] = useState([]);
  const productArray = products;
  handleData(productArray);
  console.log(productArray);

 

  return (
    <div>
      {/* <HeroBanner heroBanner={bannerData}/> */}
      {/* <NeendBanner images={images} /> */}
      <HeroImageBanner heroBanner={bannerData} />
      <HappyStrip />
      {/* <Widget /> */}
      <div className="collection-products ">
        <div className="products-heading">
          <h2>Shop Our Collection</h2>
          {/* <p>We have some amazing products</p> */}
        </div>

        <div className="products-container">
          {products?.slice(0, 6).map((product, index) => {
            {
              console.log(product.name);
            }

            return <Product key={product._id} product={product} />;
          })}
        </div>
        <Link href="/categorypages/allProducts">
          <div className="all-flash-sale">
            <button className="view-collection">View All</button>
          </div>
        </Link>
      </div>
      <hr />

      <div className="products-heading category-heading">
        <h2>Shop By Categories</h2>
      </div>
      <div className="products-container category-container">
        <Category />
      </div>

      <div className="flash-sale">
        <div className="products-heading flash-sale-heading">
          <h2>Flash Sale</h2>
        </div>
        <div className="products-container flash-sale-container">
          {products?.slice(0, 6).map((product, index) => {
            return <Product key={product._id} product={product} />;
          })}
        </div>
        <Link href="/categorypages/flashSale">
          <div className="all-flash-sale">
            <button>View All</button>
          </div>
        </Link>
      </div>

      <div id="info">
        <Info />
      </div>

      {/* <FooterBanner footerBanner={bannerData && bannerData[0]} /> */}
      <FooterMain />
    </div>
  );
};

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
