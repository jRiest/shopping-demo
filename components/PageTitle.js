import React from 'react';
import styled from '@emotion/styled';

const Title = styled.h1({
  fontSize: '24px',
  marginBottom: 20,
});

export default ({ children }) => {
  return <Title>{children}</Title>;
};
