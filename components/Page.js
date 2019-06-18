import React from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import Nav from './Nav';
import { MAX_CONTENT_WIDTH } from '../utils/constants';

const ContentWrapper = styled.section({
  padding: 20,
  maxWidth: MAX_CONTENT_WIDTH,
  margin: '0 auto',
});

export default ({ children, cart }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A demo shopping site built on Cloudflare workers"
        />
        <link rel="icon" href="/images/favicon.png" />
        <title>Shopping Demo</title>
      </head>
      <Global
        styles={css`
          * {
            margin: 0;
            padding: 0;
            border: 0;
            box-sizing: border-box;
            font: inherit;
          }

          ol,
          ul {
            list-style: none;
          }

          a {
            text-decoration: none;
            cursor: pointer;
            color: inherit;
          }

          body {
            line-height: 1;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
            background: #eae4e0;
            font-size: 16px;
            color: #222;
          }
        `}
      />
      <body>
        <Nav cart={cart} />
        <ContentWrapper>{children}</ContentWrapper>
      </body>
    </html>
  );
};
