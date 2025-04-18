import { useMemo } from "react";
import { useUserContext } from "../context/UserContext";
import {
  useCrust,
  useSize,
  useToppings,
} from "../context/PizzaDeliveryContext";

const BASE_PRICE: Record<string, number> = {
  Small: 8,
  Medium: 10,
  Large: 12,
  XLarge: 14,
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
 * A specialized hook for calculating the total price that pulls data from both
 * the PizzaDeliveryContext and UserContext. It will only trigger re-renders when
 * the price actually changes due to changes in size, crust, toppings, or delivery address.
 *
 * @returns The calculated total price
 */
export const useTotalPrice = (): number => {
  const size = useSize();
  const crust = useCrust();
  const toppings = useToppings();

  const { deliveryAddress } = useUserContext();

  return useMemo(() => {
    let price = BASE_PRICE[size] || 10;
    price += CRUST_PRICE[crust] || 0;
    price += toppings.length * PRICE_PER_TOPPING;
    price += (deliveryAddress?.length || 0) * ADDRESS_COMPLEXITY_FACTOR;

    return parseFloat(price.toFixed(2));
  }, [size, crust, toppings, deliveryAddress]);
};
