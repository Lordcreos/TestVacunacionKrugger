import React from 'react';
import NavBar from './NavBar';
import MainContent from './MainContent';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <MainContent>{children}</MainContent>
    </>
  );
}

export default Layout;
 