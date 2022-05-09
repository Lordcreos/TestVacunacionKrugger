import React from 'react';
import { Container } from 'react-bootstrap';

type Props = {
  children: React.ReactNode;
};

function MainContent({ children }: Props) {
  return (
    <>
      <Container style={{ marginTop: '1rem' }}>{children}</Container>
    </>
  );
}

export default MainContent;
