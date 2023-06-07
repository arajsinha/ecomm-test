import React, { useState } from "react";
import { getData } from "../components/dataHandler";
import Link from "next/link";

const Dropdown = () => {
  const [click, setClick] = useState(false);
  const testdata = getData();

  const handleClick = () => {
    // console.log("testdata: ", testdata);
    setClick(!click);
  };

  return (
    <div onClick={handleClick} className="hoverNavbar">
      <ul>
        {testdata &&
          testdata.map((product, index) => {
            if (product.category === "mattress") {
              return (
                <div key={index}>
                  <li>
                    <Link
                      className="dropdown-link"
                      href={`/product/${product.slug.current}`}
                      style={{ color: "black" }}
                      onClick={() => setClick(false)}
                    >
                      <a className="dropdownAnchor">{product.name}</a>
                    </Link>
                  </li>
                </div>
              );
            } else {
              return null; // Render nothing if category is not 'mattress'
            }
          })}
      </ul>
    </div>
  );
};

export default Dropdown;
