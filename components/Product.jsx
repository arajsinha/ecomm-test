import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price, original } }) => {
  function calcDiscount(original, price){
    var discount = original-price;
    var total = (discount/original)*100;
    return Math.ceil(total);
  }
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            width={350}
            height={350}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <div className="price-discount-holder">
            <p className="product-price">₹{price}</p>
            <p className="product-origprice">₹{original}</p>
            <p className="product-discount">{calcDiscount(original, price)}% Off</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
