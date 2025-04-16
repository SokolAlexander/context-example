import React from 'react';
import { useStudioContext } from '../context/StudioContext';
import RenderCounter from './RenderCounter';

const CustomerDetails: React.FC = () => {
  // Uses theme, customerName, deliveryAddress setters
  const { theme, setTheme, customerName, setCustomerName, deliveryAddress, setDeliveryAddress } = useStudioContext();

  return (
    <div className="component customer-details" style={{ position: 'relative' }}>
      <RenderCounter componentName="CustomerDetails" />
      <h4>Customer Details</h4>
      <div>
        <label htmlFor="customerName">Name:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="deliveryAddress">Delivery Address:</label>
        <input
          type="text"
          id="deliveryAddress"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="Enter delivery address"
        />
      </div>
      <div>
        <label htmlFor="theme">Theme:</label>
        <select id="theme" value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
        {/* Note: Changing address here will affect price in OrderSummary/PizzaPreview */}
        {/* due to the price calculation logic in the context, demonstrating the entanglement */}
    </div>
  );
};

export default CustomerDetails; 