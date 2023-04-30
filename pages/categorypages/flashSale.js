import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { client } from "../../lib/client";
import { Product} from "../../components";
import FooterMain from "../../components/FooterMain";
// import product from "@/ecomm-majorproj/schemas/product";

const FlashSalePage = ({ products }) => (
  <div>
    {/* {console.log(products[1]['category'])} */}
    <div className="products-heading">
      <h2>Flash Sale Products</h2>
    </div>
    <div className="products-container">
      {products?.map((product, index) => {
        if(products[index]['sale'] == 'yes') {
            return <Product key={product._id} product={product} />
        }
      })}
    </div>
    <FooterMain/>
  </div>
);

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products },
  };
};

export default FlashSalePage;
