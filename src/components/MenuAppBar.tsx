import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, IconButton, Menu, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useCallback } from 'react';

import LinkMenuItem from './LinkMenuItem';
import { useMyAppContext } from './MyAppContextProvider';

type MenuAppBarProps = {
}

const MenuAppBar: React.FC<MenuAppBarProps> = (): JSX.Element => {
  const { setShownNewCard } = useMyAppContext()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter()
  const isShownAppBarButton = ['/', '/setting'].includes(router.pathname)

  const onAppBarButtonClick = useCallback(() => {
    switch (router.pathname) {
      case '/':
        return router.push('/setting')
      case '/setting':
        return setShownNewCard(true)
      default:
        break;
    }
  }, [router, setShownNewCard])

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
        <Link href={'/'}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home Automation App
          </Typography>
        </Link>
        <Button
          sx={{
            display: isShownAppBarButton ? undefined : 'none'
          }}
          onClick={onAppBarButtonClick}
        >
          追加
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default MenuAppBar
