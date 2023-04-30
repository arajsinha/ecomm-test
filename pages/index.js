import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";
import HeroImageBanner from "../components/HeroImageBanner";
import HappyStrip from "../components/HappyStrip";
import Info from "../components/Info";
import FooterMain from "../components/FooterMain";
import Category from "../components/Category";
import Link from "next/link";

const Home = ({ products, bannerData }) => (
  <div>
    {/* {console.log(products)} */}
    {/* <HeroBanner heroBanner={bannerData.length && bannerData[0]}  /> */}
    <HeroImageBanner heroBanner={bannerData.length && bannerData[0]} />
    <HappyStrip />

    <div className="collection-products ">
      <div className="products-heading">
        <h2>Shop Our Collection</h2>
        {/* <p>We have some amazing products</p> */}
      </div>

      <div className="products-container">
        {products?.slice(0, 6).map((product, index) => {
          {/* {console.log(product._id)} */}
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
          //var count = 0;
          //if (products[index]["sale"] == "yes" && count < 6) {
          {
            /* console.log(index); */
          }
          //count++;
          return <Product key={product._id} product={product} />;
          //}
        })}
      </div>
      <Link href="/categorypages/flashSale">
        <div className="all-flash-sale">
          <button>View All</button>
        </div>
      </Link>
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
