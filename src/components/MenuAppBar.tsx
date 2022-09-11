import * as React from 'react';
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Menu, MenuItemProps } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { forwardRef } from 'react';
import LinkMenuItem from './LinkMenuItem';

type MenuAppBarProps = {
}

const MenuAppBar: React.FC<MenuAppBarProps> = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuList = [
    {
      href: '/',
      name: 'ホーム'
    },
    {
      href: '/setting',
      name: '設定',
    },
    {
      href: '/log',
      name: 'ログ',
    }
  ]

  return (
    <AppBar position="sticky">
      <Toolbar>
        <div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            keepMounted
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {menuList.map(menuItem => (
              <LinkMenuItem
                key={menuItem.href}
                href={menuItem.href}
                onClick={handleClose}>
                {menuItem.name}
              </LinkMenuItem>
            ))}
          </Menu>
        </div>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Home Automation App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default MenuAppBar
