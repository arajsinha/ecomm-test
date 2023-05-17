import React from "react";
import Link from "next/link";
import { client, urlFor } from "../lib/client";

const WishlistPage = () => {
  let wishlistData;

  try {
    // Retrieve the wishlist data from localStorage
    wishlistData = JSON.parse(localStorage.getItem("wishlist"));
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    wishlistData = null;
  }

  return (
    <div className="wishlist-container">
      <h1>Your Wishlist</h1>
      {wishlistData && wishlistData.length > 0 ? (
        <div className="wishlist-cards">
          {wishlistData.map((item, index) => (
            <div className="wishlist-card" key={index}>
              <div className="image-container-wishlist">
                <img
                  src={urlFor(item.image && item.image[0])}
                  className="product-detail-image-wishlist"
                />
              </div>
              <div className="wishlist-details">
                <Link href={`/product/${item.slug}`}>
                  <a className="wishlistProductName">
                    <h4>{item.name}</h4>
                  </a>
                </Link>
                <p>Price: {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>{wishlistData ? "Your wishlist is empty." : "Failed to access wishlist data."}</p>
      )}
    </div>
  );
};

export default WishlistPage;
