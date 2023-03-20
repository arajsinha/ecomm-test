import React from "react";
import Link from "next/link";

const Category = () => {
  return (
    <>
      <div className="categoryContainer">
        <div className="row">
          <Link href="/categorypages/mattressCategory">
            <div className="col-md-3 col-sm-12 categoryCursor">
              <div className="category-img-holder">
                <img
                  src="https://wakefitdev.gumlet.io/consumer-react/Bedroom/Mattress.jpg?w=240"
                  alt=""
                />
              </div>
              <div className="category-text-holder">
                <p>Mattresses</p>
              </div>
            </div>
          </Link>
          <Link href="/categorypages/bedsCategory"> 
            <div className="col-md-3 col-sm-12 categoryCursor">
              <div className="category-img-holder">
                <img
                  src="https://wakefitdev.gumlet.io/consumer-react/Bedroom/bed.jpg?w=240"
                  alt=""
                />
              </div>
              <div className="category-text-holder">
                <p>Beds & Pillows</p>
              </div>
            </div>
          </Link>
          <Link href="/categorypages/blanketsCategory">
            <div className="col-md-3 col-sm-12 categoryCursor">
              <div className="category-img-holder">
                <img
                  src="https://wakefitdev.gumlet.io/consumer-react/Bedroom/comforter.jpg?w=240"
                  alt=""
                />
              </div>
              <div className="category-text-holder">
                <p>Blankets & Comforters</p>
              </div>
            </div>
          </Link>
          <Link href="/categorypages/wardrobesCategory">
            <div className="col-md-3 col-sm-12 categoryCursor">
              <div className="category-img-holder">
                <img
                  src="https://wakefitdev.gumlet.io/consumer-react/More-Category/Storage/Wardrobe.jpg?w=240"
                  alt=""
                />
              </div>
              <div className="category-text-holder">
                <p>Wardrobe & Dressing Table</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="row">
          <Link href="/categorypages/seatingCategory">
            <div className="col-md-3 col-sm-12 categoryCursor">
              <div className="category-img-holder">
                <img
                  src="https://wakefitdev.gumlet.io/consumer-react/Living/Recliners.jpg?w=240"
                  alt=""
                />
              </div>
              <div className="category-text-holder">
                <p>Sofa, Chair & Seating</p>
              </div>
            </div>
          </Link>
          <Link href="/categorypages/tvunitCategory">
            <div className="col-md-3 col-sm-12 categoryCursor">
              <div className="category-img-holder">
                <img
                  src="https://wakefitdev.gumlet.io/consumer-react/More-Category/EW-Furniture/EW-TV-units.jpg?w=240"
                  alt=""
                />
              </div>
              <div className="category-text-holder">
                <p>TV Units</p>
              </div>
            </div>
          </Link>
          <Link href="/categorypages/tablesCategory">
            <div className="col-md-3 col-sm-12 categoryCursor">
              <div className="category-img-holder">
                <img
                  src="https://wakefitdev.gumlet.io/consumer-react/More-Category/WFH/Bookshelves.jpg?w=240"
                  alt=""
                />
              </div>
              <div className="category-text-holder">
                <p>Tables & Shelf</p>
              </div>
            </div>
          </Link>
          <Link href="/categorypages/wfhCategory">
            <div className="col-md-3 col-sm-12 categoryCursor">
              <div className="category-img-holder">
                <img
                  src="https://wakefitdev.gumlet.io/consumer-react/Living/Chair.jpg?w=240"
                  alt=""
                />
              </div>
              <div className="category-text-holder">
                <p>WFH Furniture</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Category;
