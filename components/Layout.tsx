import React, { useContext,ReactNode ,useCallback} from "react";
import Header from "./Header";
import {Container}from '@/components/mui/index';
import { UIContext } from "./contexts/UIContext";
import{
  Snackbar,
  Alert,
  IconButton,
  CloseIcon
} from '@/components/mui/index'
import Paragraph from "./Paragraph";
// import { UIContext } from "./contexts/UI.context";
interface LayoutProps {
    children: ReactNode;
  }
const Layout:React.FC<LayoutProps> = ({children}) => {
  const {
    isOpen: open,
    severity,
    onClose: handleClose,
    message,
    hideDuration,
  } = useContext(UIContext);


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
      <Snackbar
        open={open}
        autoHideDuration={hideDuration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          <Paragraph sx={{ margin: "0px" }}>{message}</Paragraph>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            
          </IconButton>
        </Alert>
      </Snackbar>
      
    </>
  );
};

export default Layout;

