import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";
import Carousel from "react-bootstrap/Carousel";

const HeroImageBanner = ({heroBanner}) => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <Link href={`#`}>
          {/* <img
            className="d-block w-100"
            src={urlFor(heroBanner[0].image[0].image)}
            // src={urlFor(heroBanner.image)}
            style={{ borderRadius: "15px", cursor: "pointer" }}
            alt="First slide"
          /> */}
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dwkhm30wx/image/upload/v1686156306/main_sjcwqv.jpg"
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
            src="https://res.cloudinary.com/dwkhm30wx/image/upload/v1686158637/main2_zixhhr.jpg"
            style={{ borderRadius: "15px", cursor: "pointer" }}
            alt="First slide"
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link href={`#`}>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dwkhm30wx/image/upload/v1686158637/main3_moawpu.jpg"
            style={{ borderRadius: "15px", cursor: "pointer" }}
            alt="First slide"
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link href={`#`}>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dwkhm30wx/image/upload/v1686158637/main4_tqbacx.jpg"
            style={{ borderRadius: "15px", cursor: "pointer" }}
            alt="First slide"
          />
        </Link>
      </Carousel.Item>
      {/* <Carousel.Item>
        <Link href={`#`}>
          <img
            className="d-block w-100"
            src="https://wakefitdev.gumlet.io/consumer-react/Stories-bg/Pricedrop-study-chair-h2.webp"
            style={{ borderRadius: "15px", cursor: "pointer" }}
            alt="First slide"
          />
        </Link>
      </Carousel.Item> */}
    </Carousel>
  );
};

export default HeroImageBanner;
