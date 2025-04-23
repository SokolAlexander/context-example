import React, { useState } from 'react';
import { useSize, useToppings } from '../context/PizzaDeliveryContext';
import RenderCounter from './RenderCounter';
import styles from './OrderSummary.module.css';

const BASE_PRICE: Record<string, number> = {
  Small: 8,
  Medium: 10,
  Large: 12,
  XLarge: 14,
};
const PRICE_PER_TOPPING = 1.5;

const OrderSummary: React.FC = () => {
  const size = useSize();
  const toppings = useToppings();
  const [customerName, setCustomerName] = useState<string>("");

  const totalPrice = (() => {
    let price = BASE_PRICE[size] || 10;
    price += toppings.length * PRICE_PER_TOPPING;
    return parseFloat(price.toFixed(2));
  })();

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