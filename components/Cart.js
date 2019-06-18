import React from 'react';
import Page from './Page';
import ProductList from './ProductList';
import PageTitle from './PageTitle';
import styled from '@emotion/styled';

const EmptyCart = styled.p({});

export default ({ cart, products }) => {
  return (
    <Page cart={cart}>
      <PageTitle>Cart</PageTitle>
      {cart.length ? (
        <ProductList products={products} cart={cart} />
      ) : (
        <EmptyCart>No items have been added to the cart</EmptyCart>
      )}
    </Page>
  );
};
