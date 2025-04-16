import React from 'react';
import { useStudioContext, TOPPINGS_LIST, CRUST_TYPES, SIZES } from '../context/StudioContext';
import RenderCounter from './RenderCounter';

const PizzaOptions: React.FC = () => {
  const { crust, setCrust, size, setSize, toppings, toggleTopping } = useStudioContext();

  return (
    <div className="component pizza-options" style={{ position: 'relative' }}>
      <RenderCounter componentName="PizzaOptions" />
      <h4>Pizza Options</h4>

      {/* Size Selection */}
      <div>
        <label htmlFor="size">Size:</label>
        <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
          {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Crust Selection */}
      <div>
        <label htmlFor="crust">Crust:</label>
        <select id="crust" value={crust} onChange={(e) => setCrust(e.target.value)}>
          {CRUST_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Toppings Selection */}
      <div>
        <label>Toppings:</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '5px' }}>
          {TOPPINGS_LIST.map(topping => (
            <label key={topping} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={toppings.includes(topping)}
                onChange={() => toggleTopping(topping)}
                style={{ marginRight: '5px' }}
              />
              {topping}
            </label>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PizzaOptions; 