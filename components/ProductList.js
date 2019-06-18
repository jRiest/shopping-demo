import React from 'react';
import styled from '@emotion/styled';
import CartAction from './CartAction';
import { formatPrice } from '../utils/render';

const SPACING = 8;

const List = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  margin: -SPACING,
});

const ProductWrapper = styled.div({
  padding: SPACING,
  display: 'flex',
  width: '100%',

  '@media (min-width: 450px)': {
    width: '50%',
  },

  '@media (min-width: 700px)': {
    width: '33%',
  },
});

const ProductContent = styled.div({
  border: '1px solid #ccc',
  background: '#fff',
  padding: 10,
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
});

const Image = styled.img({
  width: '100%',
  marginBottom: 6,
});

const ProductName = styled.a({
  display: 'block',
  marginBottom: 8,
  fontWeight: 700,
});

const Price = styled.p({
  marginBottom: 16,
});

const Content = styled.div({
  flex: 'auto',
});

const Actions = styled.div({
  flex: 'none',
});

export default ({ products, cart }) => {
  return (
    <List>
      {products.map(product => (
        <ProductWrapper key={product.id}>
          <ProductContent>
            <Content>
              <a href={`/products/${product.id}`}>
                <Image
                  src={product.image.replace(/\.[a-z]+$/, '-small.jpg')}
                  alt={product.name}
                />
              </a>
              <ProductName href={`/products/${product.id}`}>
                {product.name}
              </ProductName>
              <Price>{formatPrice(product.price)}</Price>
            </Content>
            <Actions>
              <CartAction product={product} cart={cart} />
            </Actions>
          </ProductContent>
        </ProductWrapper>
      ))}
    </List>
  );
};
