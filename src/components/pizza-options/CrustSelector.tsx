import React from 'react';
import { useCrust, useSetCrust, CRUST_TYPES } from '../../context/PizzaDeliveryContext';
import RenderCounter from '../RenderCounter';
import styles from './Selectors.module.css';

/**
 * Component for selecting pizza crust
 * Only re-renders when the crust changes
 */
const CrustSelector: React.FC = () => {
  // Use the crust selector and setter hooks
  const crust = useCrust();
  const setCrust = useSetCrust();

  return (
    <div className={styles.selectorContainer} style={{ position: 'relative' }}>
      <RenderCounter componentName="CrustSelector" />
      <div className={styles.selectorHeader}>
        <label htmlFor="crust" className={styles.selectorLabel}>Crust:</label>
      </div>
      <select 
        id="crust" 
        value={crust} 
        onChange={(e) => setCrust(e.target.value)}
        className={styles.selector}
      >
        {CRUST_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
};

export default CrustSelector; 