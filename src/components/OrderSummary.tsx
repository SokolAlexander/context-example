import React from 'react';
import { usePizzaDeliveryContext } from '../context/PizzaDeliveryContext.tsx';
import RenderCounter from './RenderCounter';
import styles from './OrderSummary.module.css';

const OrderSummary: React.FC = () => {
  const { totalPrice, customerName } = usePizzaDeliveryContext();

  return (
    <div className={`component ${styles.orderSummary}`} style={{ position: 'relative' }}>
      <RenderCounter componentName="OrderSummary" />
      <h4>Order Summary</h4>
      <div className={styles.summaryItem}>
        <strong>Order for: {customerName || 'Not specified'}</strong>
      </div>
      <div className={styles.summaryItem}>
        <strong className={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default OrderSummary; 