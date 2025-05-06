import React from "react";
import { useCustomerContext } from "../context/CustomerContext";
import RenderCounter from "./RenderCounter";
import styles from "./CustomerDetails.module.css";

const CustomerDetails: React.FC = () => {
  const { customerName, setCustomerName } = useCustomerContext();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(e.target.value);
  };

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
          onChange={handleNameChange}
          placeholder="Enter your name"
          className={styles.nameInput}
        />
      </div>
    </div>
  );
};

export default CustomerDetails;
