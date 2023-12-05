import React from "react";
import Link from "next/link";
import{ Box,
  AppBar,
   Toolbar,
  IconButton, 
  MenuIcon,
   Button,
   Typography } from '@/components/mui/index'
import { useTheme } from "@mui/material/styles";

function DesktopNavigation({
  handleDrawerToggle = () =>
    console.log("no handleDrawerToggle function provided"),
}) {
  const theme = useTheme();
  // console.log(theme);
  const lightTextColor = theme.palette.common.white;
  return (
    <>
      <AppBar component="nav" position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link href={'/'} passHref>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              textDecoration: "none",
              color: lightTextColor,
            }}
          >
            
            Design Shop
          </Typography>
          </Link>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Link href={'/contact'} passHref>
            <Button
              sx={{ color: lightTextColor }}
            >
              Contact
            </Button>
            </Link>
            <Link href={'/blog'} passHref>
            <Button
              sx={{ color: lightTextColor }}
            >
              Blog
            </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default DesktopNavigation;