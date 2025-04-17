import { useMemo } from 'react';
import { usePizzaDeliveryContext } from '../context/PizzaDeliveryContext';
import { useUserContext } from '../context/UserContext';

// Constants for pricing - moved from PizzaDeliveryContext
const BASE_PRICE: Record<string, number> = {
  Small: 8,
  Medium: 10,
  Large: 12,
  'X-Large': 14,
};

const PRICE_PER_TOPPING = 1.5;

const CRUST_PRICE: Record<string, number> = {
  Regular: 0,
  Thin: 0,
  Stuffed: 3,
  Cauliflower: 2,
};

const ADDRESS_COMPLEXITY_FACTOR = 0.05;

/**
 * A hook that calculates the total pizza price using data from both
 * PizzaDeliveryContext and UserContext without coupling them directly.
 */
export const usePizzaPrice = (): number => {
  // Get pizza configuration details from pizza context
  const { size, crust, toppings } = usePizzaDeliveryContext();
  
  // Get user delivery address from user context
  const { deliveryAddress } = useUserContext();

  // Calculate total price based on all relevant factors
  const totalPrice = useMemo(() => {
    let price = BASE_PRICE[size] || 10;
    price += CRUST_PRICE[crust] || 0;
    price += toppings.length * PRICE_PER_TOPPING;
    price += deliveryAddress.length * ADDRESS_COMPLEXITY_FACTOR;
    return parseFloat(price.toFixed(2));
  }, [size, crust, toppings, deliveryAddress]);

  return totalPrice;
}; 