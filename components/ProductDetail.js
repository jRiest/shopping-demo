import React from 'react';
import styled from '@emotion/styled';
import Page from './Page';
import { formatPrice } from '../utils/render';
import CartAction from './CartAction';

const MQ = '@media (min-width: 450px)';

const ImageWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
});

const Image = styled.img({
  maxWidth: '100%',
  border: '4px solid #fff',
  marginBottom: 20,
});

const ProductName = styled.h1({
  marginBottom: 10,
  fontSize: 24,
  fontWeight: 700,
});

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',

  [MQ]: {
    flexDirection: 'row',
  },
});

const Details = styled.div({
  flex: 'auto',
});

const Actions = styled.div({
  flex: 'none',
  marginTop: 20,

  [MQ]: {
    marginTop: 0,
  },
});

const Price = styled.p({});

export default ({ cart, product }) => (
  <Page cart={cart}>
    <ImageWrapper>
      <Image src={product.image} alt={product.name} />
    </ImageWrapper>
    <Content>
      <Details>
        <ProductName>{product.name}</ProductName>
        <Price>{formatPrice(product.price)}</Price>
      </Details>
      <Actions>
        <CartAction product={product} cart={cart} />
      </Actions>
    </Content>
  </Page>
);
