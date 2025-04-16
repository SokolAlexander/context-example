import React from 'react';
import { useStudioContext } from '../context/StudioContext';
import RenderCounter from './RenderCounter';

const OrderSummary: React.FC = () => {
  // Uses customerName, totalPrice, orderTime, deliveryAddress
  const { customerName, totalPrice, orderTime, deliveryAddress, placeOrder } = useStudioContext();

  return (
    <div className="component order-summary" style={{ position: 'relative' }}>
      <RenderCounter componentName="OrderSummary" />
      <h4>Order Summary</h4>
      <div>Customer: <strong>{customerName}</strong></div>
      <div>Address: <em>{deliveryAddress || '(Not specified)'}</em></div>
      <div>
        <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
      </div>
      <div style={{ marginTop: '1rem' }}>
        {orderTime ? (
          <span>Order Placed: {orderTime.toLocaleTimeString()}</span>
        ) : (
          <button onClick={placeOrder} disabled={!deliveryAddress}>Place Order</button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary; 