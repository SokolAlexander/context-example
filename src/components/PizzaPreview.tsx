import React from "react";
import { usePizzaDeliveryContext } from "../context/PizzaDeliveryContext.tsx";
import RenderCounter from "./RenderCounter";
import { ToppingIcon } from "./ToppingIcon";
import styles from "./PizzaPreview.module.css";

const PizzaPreview: React.FC = () => {
  const { size, crust, toppings, totalPrice } = usePizzaDeliveryContext();

  const dimension =
    size === "Small"
      ? "200px"
      : size === "Medium"
      ? "250px"
      : size === "Large"
      ? "300px"
      : "350px";

  const fontSize =
    size === "Small"
      ? "0.9em"
      : size === "Medium"
      ? "1em"
      : "1.1em";

  const iconSize =
    size === "Small"
      ? 24
      : size === "Medium"
      ? 28
      : 32;

  const previewCircleStyle: React.CSSProperties = {
    width: dimension,
    height: dimension,
    backgroundColor: crust === "Cauliflower" ? "#FFF8DC" : "#F5DEB3",
    borderWidth: crust === "Stuffed" ? "8px" : "2px",
    padding: "20px",
  };

  const gridColumns = Math.min(4, Math.max(2, toppings.length));

  return (
    <div className={`component ${styles.pizzaPreview}`}>
      <RenderCounter componentName="PizzaPreview" />
      <h4>Pizza Preview</h4>
      <div className={styles.previewCircle} style={previewCircleStyle}>
        <p className={styles.previewText} style={{ fontSize }}>
          {size} {crust} Crust
        </p>
        <div 
          className={styles.toppingsGrid} 
          style={{ 
            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
            maxWidth: "80%",
            margin: "10px auto"
          }}
        >
          {toppings.map((topping) => (
            <div key={topping} className={styles.toppingIcon}>
              <ToppingIcon topping={topping} size={iconSize} />
            </div>
          ))}
        </div>
      </div>
      <p className={styles.priceDisplay}>Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default PizzaPreview;
