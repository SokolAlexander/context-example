import React from 'react';
import { useSize, useSetSize, SIZES } from '../../context/PizzaDeliveryContext';
import RenderCounter from '../RenderCounter';
import styles from './Selectors.module.css';

/**
 * Component for selecting pizza size
 * Only re-renders when the size changes
 */
const SizeSelector: React.FC = () => {
  // Use the size selector and setter hooks
  const size = useSize();
  const setSize = useSetSize();

  return (
    <div className={styles.selectorContainer} style={{ position: 'relative' }}>
      <RenderCounter componentName="SizeSelector" />
      <div className={styles.selectorHeader}>
        <label htmlFor="size" className={styles.selectorLabel}>Size:</label>
      </div>
      <select 
        id="size" 
        value={size} 
        onChange={(e) => setSize(e.target.value)}
        className={styles.selector}
      >
        {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
  );
};

export default SizeSelector; 