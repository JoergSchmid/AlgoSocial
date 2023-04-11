import { AppBar, Avatar, Box, Container, IconButton, Toolbar, Tooltip } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { LeftLogoWhenBig, NavigationMenuWhenBig, PopupMenuWhenSmall, RightProfileIconMenu, TitleAndLogoWhenSmall } from "./NavBarComponents";

export default function NavBar({ avatar }: { avatar: string }) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LeftLogoWhenBig />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <PopupMenuWhenSmall anchorElNav={anchorElNav} handleCloseNavMenu={handleCloseNavMenu} />
          </Box>

          <TitleAndLogoWhenSmall />
          <NavigationMenuWhenBig handleCloseNavMenu={handleCloseNavMenu} />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile" src={avatar} />
              </IconButton>
            </Tooltip>
            <RightProfileIconMenu anchorElUser={anchorElUser} handleCloseUserMenu={handleCloseUserMenu} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}