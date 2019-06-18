import React from 'react';
import Page from './Page';
import PageTitle from './PageTitle';

export default ({ cart }) => {
  return (
    <Page cart={cart}>
      <PageTitle>Page Not Found</PageTitle>
    </Page>
  );
};
