import { AppBar, Avatar, Box, Container, IconButton, Toolbar, Tooltip } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import { LeftLogoWhenBig, NavigationMenuWhenBig, PopupMenuWhenSmall, RightProfileIconMenu, TitleAndLogoWhenSmall } from "./NavBarComponents";
import ToggleThemeButton from "./ToggleThemeButton";

export default function NavBar({ avatar, changePage }: { avatar: string, changePage: (toPage: string) => void }) {
  const [theme, setTheme] = useState<string>("light");
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme])

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

  const handlePageButtonClick = (page: string) => {
    changePage(page);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ToggleThemeButton theme={theme} toggleTheme={toggleTheme} />
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
            <PopupMenuWhenSmall anchorElNav={anchorElNav} handleCloseNavMenu={handleCloseNavMenu} handlePageButtonClick={handlePageButtonClick} />
          </Box>

          <TitleAndLogoWhenSmall />
          <NavigationMenuWhenBig handlePageButtonClick={handlePageButtonClick} />

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