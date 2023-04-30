import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/router";

let session_ids = [];

let usermail = "";

const stripeApiSessionsUrl =
  "https://api.stripe.com/v1/checkout/sessions?limit=100";

const getCustomers = async (setProducts, setLoading) => {
  const response = await fetch(stripeApiSessionsUrl, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer sk_test_51JB14ISFUaTZgP2dG5KQ620DEmj9g32f3MDKoigmSe07wvRCldYr1CsiEqhMamcI7irOxIOYLGP3jshnYm8lJxBi00yJ9D8sm2",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  for (let i = 0; i < data.data.length; i++) {
    if (
      data.data[i].payment_status === "paid" &&
      data.data[i].customer_details.email === usermail
    ) {
      session_ids.push(data.data[i]);
    }
  }

  if (session_ids.length === 0) {
    setLoading(false);
  } else {
    const getProducts = async () => {
      let tempProducts = [];

      for (let j = 0; j < session_ids.length; j++) {
        const response = await fetch(
          `https://api.stripe.com/v1/checkout/sessions/${session_ids[j].id}/line_items?limit=100`,
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer sk_test_51JB14ISFUaTZgP2dG5KQ620DEmj9g32f3MDKoigmSe07wvRCldYr1CsiEqhMamcI7irOxIOYLGP3jshnYm8lJxBi00yJ9D8sm2",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        tempProducts.push(data);
      }
      setProducts(tempProducts);
      setLoading(false);
      console.log(tempProducts);
    };

    getProducts();
  }
};

export default function order() {
  const router = useRouter();
  usermail = router.query.email;
  console.log("email: ", usermail);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCustomers(setProducts, setLoading);
  }, []);

  return (
    <div className="myorders">
      <h1>My Orders</h1>
      <br />
      {loading && <p>Loading...</p>}
      {!loading && products.length === 0 && <p>No past orders</p>}
      <div className="orders">
        {products.map((product, index) => (
          <div key={index} className="ordercard">
            {product.data.map((data, dataIndex) => (
              <div key={dataIndex}>
            <h3 className="prod-name">{data.description}</h3>
                <p className="prod-price">
                  <span>Unit Price - </span>
                  {data.currency} {data.price.unit_amount / 100}
                </p>
                <p className="prod-qty">
                  <span>Qty - </span>
                  {data.quantity}
                </p>
                <p className="prod-totalprice">
                  <span>Total Price - </span>
                  {data.currency}{" "}
                  {(data.price.unit_amount / 100) * data.quantity}
                </p>
                <br />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
