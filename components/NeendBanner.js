import React from "react";
import Slider from "react-slick";
import imageUrlBuilder from "@sanity/image-url";
import client from "../lib/client";

const NeendBanner = ({ images }) => {
  const builder = imageUrlBuilder(client);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((image) => (
        <div key={image._key}>
          <img src={builder.image(image.url).url()} alt={image.alt} />
        </div>
      ))}
    </Slider>
  );
};

export default NeendBanner;
