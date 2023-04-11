import { Avatar, Box, Button, Menu, MenuItem, Typography } from "@mui/material"
import logo from "../static/images/logo.png"

const pages = ['Home', 'Profile', 'Settings', '(NYI)'];
const settings = ['Profile', 'Account', 'Logout'];

export function LeftLogoWhenBig() {
    return (
        <>
            <Avatar alt="Logo" src={logo} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 8,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 200,
                    color: "inherit",
                    textDecoration: "none"
                }}
            >
                Algorithmic social network
            </Typography>
        </>
    );
}

export function PopupMenuWhenSmall({ anchorElNav, handleCloseNavMenu }: { anchorElNav: null | HTMLElement, handleCloseNavMenu: (event: React.MouseEvent<HTMLElement>) => void }) {
    return (
        <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
                display: { xs: 'block', md: 'none' },
            }}
        >
            {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                </MenuItem>
            ))}
        </Menu>
    );
}

export function TitleAndLogoWhenSmall() {
    return (
        <>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 8,
                    display: { xs: "flex", md: "none" },
                    fontFamily: "monospace",
                    fontWeight: 200,
                    color: "inherit",
                    textDecoration: "none"
                }}
            >
                ALGO SOCIAL
            </Typography>
            <Avatar alt="Profile" src={logo} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        </>
    );
}

export function NavigationMenuWhenBig({ handleCloseNavMenu }: { handleCloseNavMenu: (event: React.MouseEvent<HTMLElement>) => void }) {
    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page}
                </Button>
            ))}
        </Box>
    );
}

export function RightProfileIconMenu({ anchorElUser, handleCloseUserMenu }: { anchorElUser: null | HTMLElement, handleCloseUserMenu: (event: React.MouseEvent<HTMLElement>) => void }) {
    return (
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}>

            {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
            ))}
        </Menu>
    );
}