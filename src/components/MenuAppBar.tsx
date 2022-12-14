import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, IconButton, Menu, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useCallback } from 'react';

import usePubSub from '../hooks/usePubsub';
import LinkMenuItem from './LinkMenuItem';

type MenuAppBarProps = {
}

const MenuAppBar: React.FC<MenuAppBarProps> = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { publish } = usePubSub()
  const router = useRouter()
  const [appBarButtonContent, setAppBarButtonContent] = React.useState('')

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

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onAppBarButtonClick = useCallback(() => {
    switch (router.pathname) {
      case '/setting':
        publish('AppBarAddSettingButtonClickEvent')
        break;
      case '/log':
        publish('AppBarClearLogButtonClickEvent')
        break;
      default:
        break;
    }
  }, [router.pathname, publish])

  React.useEffect(() => {
    switch (router.pathname) {
      case '/setting':
        setAppBarButtonContent('追加')
        break;
      case '/log':
        setAppBarButtonContent('クリア')
        break;
      default:
        setAppBarButtonContent('')
        break;
    }
  }, [router.pathname])

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
            display: appBarButtonContent !== '' ? undefined : 'none'
          }}
          onClick={onAppBarButtonClick}
        >
          {appBarButtonContent}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default MenuAppBar
