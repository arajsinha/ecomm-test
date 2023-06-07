import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";
import Carousel from "react-bootstrap/Carousel";

const HeroImageBanner = ({ heroBanner }) => {
  return (
    <Carousel fade>
      {heroBanner[0].images.map((image, index) => (
        <Carousel.Item key={index}>
          <Link href={image.link}>
            <img
              className="d-block w-100"
              src={urlFor(image.image)}
              style={{ borderRadius: "15px", cursor: "pointer" }}
              alt={`Slide ${index + 1}`}
            />
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroImageBanner;
