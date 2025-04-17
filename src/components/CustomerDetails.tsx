import React from 'react';
import { usePizzaDeliveryContext } from '../context/PizzaDeliveryContext.tsx';
import RenderCounter from './RenderCounter';
import styles from './CustomerDetails.module.css'; // Import CSS Module

const CustomerDetails: React.FC = () => {
  const { theme, setTheme, customerName, setCustomerName, deliveryAddress, setDeliveryAddress } = usePizzaDeliveryContext();

  return (
    <div className={`component ${styles.customerDetails}`} style={{ position: 'relative' }}>
      <RenderCounter componentName="CustomerDetails" />
      <h4>Customer Details</h4>
      <div className={styles.detailGroup}>
        <label htmlFor="customerName">Name:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div className={styles.detailGroup}>
        <label htmlFor="deliveryAddress">Delivery Address:</label>
        <input
          type="text"
          id="deliveryAddress"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="Enter delivery address"
        />
      </div>
      <div className={styles.detailGroup}>
        <label htmlFor="theme">Theme:</label>
        <select id="theme" value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      {/* Note about price entanglement removed as it's part of the exercise description elsewhere */}
    </div>
  );
};

export default CustomerDetails; 