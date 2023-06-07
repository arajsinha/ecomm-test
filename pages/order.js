import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

import firebaseConfig from "../lib/firebase";

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

const OrderHistory = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async (userUid) => {
      try {
        const firestore = getFirestore();
        const userRef = doc(firestore, "users", userUid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userOrders = userData.orders || [];

          const sortedOrders = userOrders.sort(
            (a, b) => b.purchaseDate - a.purchaseDate
          );
          setOrders(sortedOrders);
        }
      } catch (error) {
        console.log("Error fetching order history:", error);
      }
    };

    const authStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchOrderHistory(user.uid);
      } else {
        router.push("/loginmobile?reload=false");
      }
    });

    return () => {
      authStateChanged(); // Unsubscribe from the auth state change listener
    };
  }, [router]);

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString(); // Adjust the date formatting as needed
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h2 style={{ textAlign: "center" }}>Order History</h2>
        <br />
        {orders.length > 0 ? (
          <ul style={{ listStyle: "none" }}>
            {orders.map((order, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: "#f5cfba",
                  padding: "2% 4%",
                  margin: "3% 0",
                  borderRadius: "20px",
                }}
              >
                <div>
                  {order.productDataLayer.map((product) => (
                    <div key={product.index}>
                      <Link href={`/product/${product.slug}`}>
                        <h3
                          style={{
                            cursor: "pointer",
                            color: "#e41d24",
                            marginBottom: "20px",
                          }}
                        >
                          {product.name}
                        </h3>
                      </Link>
                      <p>
                        <span style={{ fontWeight: "600" }}>Unit Price:</span>{" "}
                        {product.price}
                      </p>
                      <p>
                        <span style={{ fontWeight: "600" }}>Quantity:</span>{" "}
                        {product.quantity}
                      </p>
                      <p>
                        <span style={{ fontWeight: "600" }}>Total Price:</span>{" "}
                        {product.price * product.quantity}
                      </p>
                      <hr />
                      {/* Render other product details as needed */}
                    </div>
                  ))}
                </div>
                {/* Display other order details as needed */}
                <p>
                  <span style={{ fontWeight: "600" }}>Delivery Status:</span>{" "}
                  {order.delivery_status}
                </p>
                <p>
                  <span style={{ fontWeight: "600" }}>Purchase Date:</span>{" "}
                  {formatDate(order.purchaseDate)}
                </p>
                <p>
                  <span style={{ fontWeight: "600" }}>Order ID:</span>{" "}
                  {order.txn_id}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No order history found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
