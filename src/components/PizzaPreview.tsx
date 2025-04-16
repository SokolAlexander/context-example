import React from 'react';
import { useStudioContext } from '../context/StudioContext';
import RenderCounter from './RenderCounter';

const PizzaPreview: React.FC = () => {
  // Uses size, crust, toppings, totalPrice
  const { size, crust, toppings, totalPrice } = useStudioContext();

  const toppingsList = toppings.join(', ') || 'Plain';

  // Simple visual representation (could be improved with actual images/CSS)
  const previewStyle: React.CSSProperties = {
      border: '2px solid #8B4513', // Brown border for crust
      borderRadius: '50%',
      padding: '20px',
      margin: '20px auto',
      textAlign: 'center',
      position: 'relative',
      fontSize: '0.9em',
      width: size === 'Small' ? '100px' : size === 'Medium' ? '150px' : size === 'Large' ? '200px' : '250px',
      height: size === 'Small' ? '100px' : size === 'Medium' ? '150px' : size === 'Large' ? '200px' : '250px',
      backgroundColor: crust === 'Cauliflower' ? '#FFF8DC' : '#F5DEB3', // Different background for cauliflower
      borderWidth: crust === 'Stuffed' ? '8px' : '2px', // Thicker border for stuffed
  };

  return (
    <div className="component pizza-preview" style={{ position: 'relative', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <RenderCounter componentName="PizzaPreview" />
      <h4>Pizza Preview</h4>
      <div style={previewStyle}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{size} {crust} Crust</p>
          <p style={{ fontSize: '0.8em', maxHeight: '60px', overflowY: 'auto' }}>Toppings: {toppingsList}</p>
      </div>
      <p style={{ marginTop: '1rem', fontWeight: 'bold', fontSize: '1.2em' }}>
        Price: ${totalPrice.toFixed(2)}
      </p>
    </div>
  );
};

export default PizzaPreview; 