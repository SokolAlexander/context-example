import React from 'react';
import { useStudioContext, TOPPINGS_LIST, CRUST_TYPES, SIZES } from '../context/StudioContext';
import RenderCounter from './RenderCounter';
import styles from './PizzaOptions.module.css';

const PizzaOptions: React.FC = () => {
  const { crust, setCrust, size, setSize, toppings, toggleTopping } = useStudioContext();

  return (
    <div className={`component ${styles.pizzaOptions}`} style={{ position: 'relative' }}>
      <RenderCounter componentName="PizzaOptions" />
      <h4>Pizza Options</h4>

      <div className={styles.optionGroup}>
        <label htmlFor="size">Size:</label>
        <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
          {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className={styles.optionGroup}>
        <label htmlFor="crust">Crust:</label>
        <select id="crust" value={crust} onChange={(e) => setCrust(e.target.value)}>
          {CRUST_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className={styles.optionGroup}>
        <label>Toppings:</label>
        <div className={styles.toppingsContainer}>
          {TOPPINGS_LIST.map(topping => (
            <label key={topping} className={styles.toppingLabel}>
              <input
                type="checkbox"
                checked={toppings.includes(topping)}
                onChange={() => toggleTopping(topping)}
                className={styles.toppingCheckbox}
              />
              {topping}
            </label>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PizzaOptions; 