import React, { useState } from 'react';
import { usePizzaDeliveryContext } from '../context/PizzaDeliveryContext.tsx';
import RenderCounter from './RenderCounter';
import styles from './OrderSummary.module.css';

const OrderSummary: React.FC = () => {
  const { totalPrice } = usePizzaDeliveryContext();
  const [customerName, setCustomerName] = useState<string>("");

  return (
    <div className={`component ${styles.orderSummary}`} style={{ position: 'relative' }}>
      <RenderCounter componentName="OrderSummary" />
      <h4>Order Summary</h4>
      <div className={styles.summaryItem}>
        <label htmlFor="customerName">Customer Name:</label>
        <input
          id="customerName"
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      {customerName && (
        <div className={styles.summaryItem}>
          <strong>Order for: {customerName}</strong>
        </div>
      )}
      <div className={styles.summaryItem}>
        <strong className={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default OrderSummary; 