import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";

import {
  ProductCardContainer,
  Footer,
  Name,
  Price } from "./product-card.styles";

const ProductCard = ({product}) => {
  const { addItemToCart } = useContext(CartContext);
  const { name, price, imageUrl } = product

  const addToCart = () => {
    addItemToCart(product);
  }

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`}/>
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button type="inverted" onClick={addToCart}>Add to Cart</Button>
    </ProductCardContainer>
  )
}

export default ProductCard;
