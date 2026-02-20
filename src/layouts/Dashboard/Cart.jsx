import React from 'react';
import useCart from '../../hooks/useCart';

const Cart = () => {
  const [cart] = useCart();
  return (
    <div>
<h2>cart</h2>
  <h3>{cart.length}</h3>
    </div>
  );
};

export default Cart;