import React from 'react';
import Page from './Page';
import ProductList from './ProductList';
import PageTitle from './PageTitle';

export default ({ cart, featuredProducts }) => {
  return (
    <Page cart={cart}>
      <PageTitle>Featured Products</PageTitle>
      <ProductList products={featuredProducts} cart={cart} />
    </Page>
  );
};
