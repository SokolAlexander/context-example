import React from 'react';
import { useTotalPrice } from '../hooks/useTotalPrice';
import RenderCounter from './RenderCounter';
import styles from './PriceDisplay.module.css';


const PriceDisplay: React.FC = () => {
  const totalPrice = useTotalPrice();
  
  return (
    <div className={`component ${styles.priceDisplay}`} style={{ position: 'relative' }}>
      <RenderCounter componentName="PriceDisplay" />
      <h4>Total Price (Optimized)</h4>
      <p className={styles.price}>${totalPrice.toFixed(2)}</p>
      <p className={styles.note}>
        This component only re-renders when the price changes because it uses the
        specialized hook that carefully tracks all dependencies.
      </p>
    </div>
  );
};

export default PriceDisplay; 