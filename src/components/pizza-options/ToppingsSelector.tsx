import React from 'react';
import { useToppings, useToggleTopping, TOPPINGS_LIST } from '../../context/PizzaDeliveryContext';
import RenderCounter from '../RenderCounter';
import styles from './Selectors.module.css';

/**
 * Component for selecting pizza toppings
 * Only re-renders when the toppings list changes
 */
const ToppingsSelector: React.FC = () => {
  // Use the toppings selector and toggler hooks
  const toppings = useToppings();
  const toggleTopping = useToggleTopping();

  return (
    <div className={styles.toppingsContainer} style={{ position: 'relative' }}>
      <RenderCounter componentName="ToppingsSelector" />
      <div className={styles.selectorHeader}>
        <label className={styles.selectorLabel}>Toppings:</label>
        <span className={styles.toppingsCount}>
          {toppings.length} selected
        </span>
      </div>
      <div className={styles.toppingsGrid}>
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
  );
};

export default ToppingsSelector; 