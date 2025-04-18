import React, { useState, useCallback } from 'react';
import { useUserContext } from '../context/UserContext.tsx';
import { usePizzaPrice } from '../hooks/usePizzaPrice';
import RenderCounter from './RenderCounter';
import styles from './OrderSummary.module.css';

const OrderSummary: React.FC = () => {
  const { customerName, deliveryAddress } = useUserContext();
  const totalPrice = usePizzaPrice();

  const [orderTime, setOrderTime] = useState<Date | null>(null);

  const handlePlaceOrder = useCallback(() => {
    if (!deliveryAddress) {
      alert('Please enter a delivery address before placing the order.');
      return;
    }
    setOrderTime(new Date());
    console.log('Order placed! (Locally handled)');
  }, [deliveryAddress]);

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
          <button onClick={handlePlaceOrder} disabled={!deliveryAddress}>Place Order</button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary; 