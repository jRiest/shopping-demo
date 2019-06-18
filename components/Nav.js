import React from 'react';
import styled from '@emotion/styled';
import { MAX_CONTENT_WIDTH } from '../utils/constants';

const OuterWrapper = styled.nav({
  background: '#1a1a1a',
  overflow: 'hidden',
  '& a:hover': {
    opacity: 0.8,
  },
  '& a:active': {
    opacity: 0.5,
  },
});

const ContentWrapper = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'white',
  maxWidth: MAX_CONTENT_WIDTH,
  padding: '0 20px',
  margin: '0 auto',
});

const HomeLink = styled.a({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '16px 20px 16px 0',
});

const Logo = styled.img({
  display: 'block',
  flex: 'auto',
  marginRight: 10,
  width: 45,
});

const SiteName = styled.div({
  flex: '0 1 auto',
  fontSize: 24,
  fontWeight: 700,
});

const CartLink = styled.a({
  display: 'flex',
  alignItems: 'center',
});

const CartCount = styled.span({
  background: '#fff',
  color: '#1a1a1a',
  borderRadius: 12,
  textAlign: 'center',
  minWidth: 24,
  minHeight: 24,
  padding: '4px 8px',
  marginRight: 6,
  flex: '0 0 auto',
});

const CartText = styled.span({
  lineHeight: '18px',
});

export default ({ cart }) => {
  return (
    <OuterWrapper>
      <ContentWrapper>
        <HomeLink href="/">
          <Logo src="/images/logo.svg" alt="Logo" />
          <SiteName>Shopping Demo</SiteName>
        </HomeLink>

        <CartLink href="/cart">
          <CartCount>{cart.length}</CartCount>
          <CartText>Cart</CartText>
        </CartLink>
      </ContentWrapper>
    </OuterWrapper>
  );
};
