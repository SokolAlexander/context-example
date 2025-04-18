import React from 'react';
import { usePizzaDeliveryContext } from '../context/PizzaDeliveryContext.tsx';
import RenderCounter from './RenderCounter';
import styles from './OrderSummary.module.css';

const OrderSummary: React.FC = () => {
  const { customerName, totalPrice, orderTime, deliveryAddress, placeOrder } = usePizzaDeliveryContext();

  return (
    <div className={`component ${styles.orderSummary}`} style={{ position: 'relative' }}>
      <RenderCounter componentName="OrderSummary" />
      <h4>Order Summary</h4>
      <div className={styles.summaryItem}>Customer: <strong>{customerName}</strong></div>
      <div className={styles.summaryItem}>Address: <em>{deliveryAddress || '(Not specified)'}</em></div>
      <div className={styles.summaryItem}>
        <strong className={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</strong>
      </div>
      <div className={styles.orderActions}>
        {orderTime ? (
          <span className={styles.orderPlacedText}>Order Placed: {orderTime.toLocaleTimeString()}</span>
        ) : (
          <button onClick={placeOrder} disabled={!deliveryAddress}>Place Order</button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary; 