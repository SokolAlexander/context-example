import React from "react";
import RenderCounter from "./RenderCounter";
import SizeSelector from "./pizza-options/SizeSelector";
import CrustSelector from "./pizza-options/CrustSelector";
import ToppingsSelector from "./pizza-options/ToppingsSelector";
import styles from "./PizzaOptions.module.css";

const PizzaOptions: React.FC = () => {
  return (
    <div
      className={`component ${styles.pizzaOptions}`}
      style={{ position: "relative" }}
    >
      <RenderCounter componentName="PizzaOptions" />
      <h4>Pizza Options</h4>
      
      <div className={styles.horizontalSelectors}>
        <SizeSelector />
        <CrustSelector />
      </div>

      <ToppingsSelector />
    </div>
  );
};

export default PizzaOptions;
