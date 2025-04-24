import React from 'react';
import pepperoniIcon from '../assets/pepperoni-svgrepo-com.svg';
import mushroomIcon from '../assets/mushroom-svgrepo-com.svg';
import onionIcon from '../assets/red-onion-svgrepo-com.svg';
import olivesIcon from '../assets/olives-svgrepo-com.svg';

interface ToppingIconProps {
  topping: string;
  size?: number;
}

export const ToppingIcon: React.FC<ToppingIconProps> = ({ topping, size = 24 }) => {
  const icons: Record<string, string> = {
    Pepperoni: pepperoniIcon,
    Mushrooms: mushroomIcon,
    Onions: onionIcon,
    Olives: olivesIcon,
  };

  return (
    <img 
      src={icons[topping]} 
      alt={topping}
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
    />
  );
}; 