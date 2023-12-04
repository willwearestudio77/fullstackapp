import React, { useContext,ReactNode } from "react";
import Header from "./Header";
import {Container}from '@/components/mui/index';
// import { UIContext } from "./contexts/UI.context";
interface LayoutProps {
    children: ReactNode;
  }
const Layout:React.FC<LayoutProps> = ({children}) => {


  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="md">
          {children}
        </Container>
      </main>
      
    </>
  );
};

export default Layout;

