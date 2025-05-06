import React from "react";
import { usePizzaDeliveryContext } from "../context/PizzaDeliveryContext.tsx";
import RenderCounter from "./RenderCounter";
import styles from "./CustomerDetails.module.css";

const CustomerDetails: React.FC = () => {
  const { theme, toggleTheme } = usePizzaDeliveryContext();

  return (
    <div
      className={`component ${styles.customerDetails}`}
      style={{ position: "relative" }}
    >
      <RenderCounter componentName="CustomerDetails" />
      <h4>Customer Details</h4>
      <div className={styles.detailGroup}>
        <label htmlFor="theme">Theme:</label>
        <select
          id="theme"
          value={theme}
          onChange={(e) =>
            toggleTheme()
          }
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
};

export default CustomerDetails;
