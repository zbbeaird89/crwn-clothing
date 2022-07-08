import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount
} from "./cart-icon.styles";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer>
      <ShoppingIcon onClick={toggleIsCartOpen}/>
      <ItemCount onClick={toggleIsCartOpen}>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;
