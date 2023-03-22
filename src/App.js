import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import { useEffect } from "react";
import { useAuth } from "./context/GlobalState";
import { auth } from "./firebase";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
  const { dispatch } = useAuth();
  const stripePromise = loadStripe(
    "pk_test_51LmlKXBaZvmSrpQsx03dm9POcrvs8hoCeGE2svTiM110BQbcPacRzjK3USWDVMwkKkz4Kf7LcaXBCO7ET2cUItJV00jywlp8JU"
  );
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
            </>
          }
        />
        <Route path="/login" element={<Login />} />

        <Route
          path="/payment"
          element={
            <>
              <Header />
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
