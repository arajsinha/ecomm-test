import React from "react";
import Link from "next/link";

const FooterMain = () => {
  return (
    <>
      <div className="mainFooter">
        <div className="row">
          <div className="col-md-4 col-sm-12 socials">
            <div className="logo">
              <img
                src="https://wakefitdev.gumlet.io/consumer-react/assets/images/Footer/wakefit%20logo%202%201.png?w=400"
                alt=""
              />
            </div>
            <div className="footerinfoholder">
              <a className="footerinfo" href="/">
                All Products
              </a>
              <a className="footerinfo" href="/">
                Offers
              </a>
            </div>
            <div className="social-icons">
              <div className="socialicon insta">
                <a href="">
                  <img
                    src="https://wakefitdev.gumlet.io/consumer-react/assets/images/Instagram.svg?w=400"
                    alt="insta-icon"
                  />
                </a>
              </div>
              <div className="socialicon fb">
                <a href="">
                  <img
                    src="https://wakefitdev.gumlet.io/consumer-react/assets/images/Facebook.svg?w=400"
                    alt="fb-icon"
                  />
                </a>
              </div>
              <div className="socialicon twitter">
                <a href="">
                  <img
                    src="https://wakefitdev.gumlet.io/consumer-react/assets/images/Twitter.svg?w=400"
                    alt="twitter-icon"
                  />
                </a>
              </div>
              <div className="socialicon linkedin">
                <a href="">
                  <img
                    src="https://wakefitdev.gumlet.io/consumer-react/assets/images/LinkedIn.svg?w=400"
                    alt="in-icon"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 policies">
            <div className="footerinfoholder">
              {/* <a href="/">Policies</a> */}
              <a href="/">FAQ's</a>
              <a href="/">Shipping</a>
              <a href="/">Payment, Returns and Refunds</a>
              <a href="/">Warranty</a>
            </div>
            <div className="footerinfoholder">
              <a href="/">Terms of Service</a>
              <a href="/">Privacy Policy</a>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 help">
            <div className="footerinfoholder">
              <a href="/">Help</a>
            </div>
            <div className="footerinfoholder">
              <p className="footertitle">
                Contact Us at <a className="phone" href="tel:9108447740 ">9108447740 </a>{" "}
              </p>
              <p className="footerdesc">
                We are here to help you every day between 9:30 AM to 7:30 PM
              </p>
            </div>
            <div className="footerinfoholder">
              <p className="footertitle">
                Registered Office, Manufacturer & Packer
              </p>
              <p className="footerdesc">
                No.49 4th B Cross, <br /> Nandagakul Estate Thigalarapalya Main Road <br />
                Peenya 2nd Stage <br /> Bengaluru-560058, Karnataka
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterMain;
