import React from "react";
import { usePizzaDeliveryContext } from "../context/PizzaDeliveryContext.tsx";
import RenderCounter from "./RenderCounter";
import styles from "./CustomerDetails.module.css";

const CustomerDetails: React.FC = () => {
  const {
    customerName,
    setCustomerName,
  } = usePizzaDeliveryContext();

  return (
    <div
      className={`component ${styles.customerDetails}`}
      style={{ position: "relative" }}
    >
      <RenderCounter componentName="CustomerDetails" />
      <div className={styles.nameWrapper}>
        <label htmlFor="customerName">Customer Name:</label>
        <input
          id="customerName"
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter your name"
          className={styles.nameInput}
        />
      </div>
    </div>
  );
};

export default CustomerDetails;
