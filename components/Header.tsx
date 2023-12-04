
import * as React from "react";
import {Box} from "@/components/mui/index";
// import Toolbar from "@mui/material/Toolbar";
import MobileNavigation from "./navigation/MobileNavigation";
import DesktopNavigation from "./navigation/DesktopNavigation";
// import ErrorBoundary from "./debug/ErrorBoundary";

function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MobileNavigation
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
      <DesktopNavigation handleDrawerToggle={handleDrawerToggle} />
      
    </Box>
  );
}

export default Header;