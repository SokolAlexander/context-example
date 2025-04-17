import React from 'react';
import { usePizzaDeliveryContext, TOPPINGS_LIST, CRUST_TYPES, SIZES } from '../context/PizzaDeliveryContext.tsx';
import RenderCounter from './RenderCounter';
import styles from './PizzaOptions.module.css';

const PizzaOptions: React.FC = () => {
  const { crust, setCrust, size, setSize, toppings, toggleTopping } = usePizzaDeliveryContext();

  return (
    <div className={`component ${styles.pizzaOptions}`}>
      <RenderCounter componentName="PizzaOptions" />
      <h2>Pizza Options</h2>

      <div className={styles.optionsLayout}>
        <div className={`component ${styles.optionCard}`}>
          <RenderCounter componentName="Size" />
          <h3>Size:</h3>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className={`component ${styles.optionCard}`}>
          <RenderCounter componentName="Crust" />
          <h3>Crust:</h3>
          <select value={crust} onChange={(e) => setCrust(e.target.value)}>
            {CRUST_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className={`component ${styles.optionCard}`}>
          <RenderCounter componentName="Toppings" />
          <h3>Toppings:</h3>
          <div className={styles.toppingsGrid}>
            {TOPPINGS_LIST.map(topping => (
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
          <div className={styles.toppingsCount}>
            {toppings.length} selected
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaOptions; 