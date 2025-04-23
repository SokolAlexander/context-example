import React from "react";
import { useCrust, useSize, useToppings } from "../context/PizzaDeliveryContext";
import RenderCounter from "./RenderCounter";
import styles from "./PizzaPreview.module.css";

const BASE_PRICE: Record<string, number> = {
  Small: 8,
  Medium: 10,
  Large: 12,
  XLarge: 14,
};
const PRICE_PER_TOPPING = 1.5;

const PizzaPreview: React.FC = () => {
  const size = useSize();
  const crust = useCrust();
  const toppings = useToppings();

  const totalPrice = (() => {
    let price = BASE_PRICE[size] || 10;
    price += toppings.length * PRICE_PER_TOPPING;
    return parseFloat(price.toFixed(2));
  })();

  const toppingsList = toppings.join(", ") || "Plain";

  const dimension =
    size === "Small"
      ? "100px"
      : size === "Medium"
      ? "150px"
      : size === "Large"
      ? "200px"
      : "250px";

  const previewCircleStyle: React.CSSProperties = {
    width: dimension,
    height: dimension,
    backgroundColor: crust === "Cauliflower" ? "#FFF8DC" : "#F5DEB3",
    borderWidth: crust === "Stuffed" ? "8px" : "2px",
  };

  return (
    <div
      className={`component ${styles.pizzaPreview}`}
      style={{ position: "relative" }}
    >
      <RenderCounter componentName="PizzaPreview" />
      <h4>Pizza Preview</h4>
      <div className={styles.previewCircle} style={previewCircleStyle}>
        <p className={styles.previewText}>
          {size} {crust} Crust
        </p>
        <p className={styles.toppingsText}>Toppings: {toppingsList}</p>
      </div>
      <p className={styles.priceDisplay}>Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default PizzaPreview;
