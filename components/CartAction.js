import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button(props => ({
  display: 'block',
  width: '100%',
  backgroundColor: props.isAddToCart ? '#196ec5' : '#c51939',
  color: 'white',
  padding: 10,
  cursor: 'pointer',
  justifySelf: 'flex-end',
  '&:hover': {
    backgroundColor: props.isAddToCart ? '#3c92ea' : '#ea3c54',
  },
  '&:active': {
    backgroundColor: props.isAddToCart ? '#215488' : '#882121',
  },
}));

export default ({ cart, product }) => {
  const isInCart = cart.some(({ id }) => id === product.id);
  const action = isInCart ? 'Remove from cart' : 'Add to cart';

  return (
    <form action="/update-cart" method="post">
      <input type="hidden" name="id" value={product.id} />
      <input type="hidden" name="delta" value={isInCart ? -1 : 1} />
      <Button isAddToCart={!isInCart}>{action}</Button>
    </form>
  );
};
