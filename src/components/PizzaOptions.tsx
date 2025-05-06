import React, { memo } from "react";
import {
  TOPPINGS_LIST,
  CRUST_TYPES,
  SIZES,
  useCrust,
  useSize,
  useToppings,
  useSetCrust,
  useSetSize,
  useToggleTopping,
  Crust,
  Size,
} from "../context/PizzaDeliveryContext";
import RenderCounter from "./RenderCounter";
import styles from "./PizzaOptions.module.css";

function SizeSelector() {
  const size = useSize();
  const setSize = useSetSize();

  return (
    <div className={`component ${styles.optionCard}`}>
      <RenderCounter componentName="Size" />
      <h3>Size:</h3>
      <select value={size} onChange={(e) => setSize(e.target.value as Size)}>
        {SIZES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}

function CrustSelector() {
  const crust = useCrust();
  const setCrust = useSetCrust();

  return (
    <div className={`component ${styles.optionCard}`}>
      <RenderCounter componentName="Crust" />
      <h3>Crust:</h3>
      <select value={crust} onChange={(e) => setCrust(e.target.value as Crust)}>
        {CRUST_TYPES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};

function ToppingsSelector() {
  const toppings = useToppings();
  const toggleTopping = useToggleTopping();

  return (
    <div className={`component ${styles.optionCard}`}>
      <RenderCounter componentName="Toppings" />
      <h3>Toppings:</h3>
      <div className={styles.toppingsGrid}>
        {TOPPINGS_LIST.map((topping) => (
          <label key={topping} className={styles.toppingItem}>
            <input
              type="checkbox"
              checked={toppings.includes(topping)}
              onChange={() => toggleTopping(topping)}
            />
            {topping}
          </label>
        ))}
      </div>
      <div className={styles.toppingsCount}>{toppings.length} selected</div>
    </div>
  );
}

const PizzaOptions: React.FC = () => {
  return (
    <div className={`component ${styles.pizzaOptions}`}>
      <RenderCounter componentName="PizzaOptions" />
      <h2>Pizza Options</h2>
      <div className={styles.optionsLayout}>
        <SizeSelector />
        <CrustSelector />
        <ToppingsSelector />
      </div>
    </div>
  );
};

export default PizzaOptions;
