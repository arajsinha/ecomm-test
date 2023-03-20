import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";
import Carousel from "react-bootstrap/Carousel";

const HeroImageBanner = ({heroBanner}) => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <Link href={`#`}>
          <img
            className="d-block w-100"
            src="https://wakefitdev.gumlet.io/consumer-react/Stories-bg/7th-bday-sale-xpertgrid-mattress-h2.webp"
            // src={urlFor(heroBanner.image)}
            style={{ borderRadius: "15px", cursor: "pointer" }}
            alt="First slide"
          />
        </Link>
        {/* {console.log(bannerData[0])} */}
        {/* <p>{heroBanner.smallText}</p> */}
      </Carousel.Item>
      <Carousel.Item>
        <Link href={`#`}>
          <img
            className="d-block w-100"
            src="https://wakefitdev.gumlet.io/consumer-react/Stories-bg/plus-mattress-h2-v1.webp"
            style={{ borderRadius: "15px", cursor: "pointer" }}
            alt="First slide"
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link href={`#`}>
          <img
            className="d-block w-100"
            src="https://wakefitdev.gumlet.io/consumer-react/Stories-bg/Pricedrop-wallet-h2.webp"
            style={{ borderRadius: "15px", cursor: "pointer" }}
            alt="First slide"
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link href={`#`}>
          <img
            className="d-block w-100"
            src="https://wakefitdev.gumlet.io/consumer-react/Stories-bg/sofa-plus-series-v1.webp"
            style={{ borderRadius: "15px", cursor: "pointer" }}
            alt="First slide"
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link href={`#`}>
          <img
            className="d-block w-100"
            src="https://wakefitdev.gumlet.io/consumer-react/Stories-bg/Pricedrop-study-chair-h2.webp"
            style={{ borderRadius: "15px", cursor: "pointer" }}
            alt="First slide"
          />
        </Link>
      </Carousel.Item>
    </Carousel>
  );
};

export default HeroImageBanner;
