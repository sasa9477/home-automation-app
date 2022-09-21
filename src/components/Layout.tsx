import { Grow } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

import MenuAppBar from './MenuAppBar';

type LayoutProps = {
  readonly children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      TransitionComponent={Grow}
      hideIconVariant

    >
      <MenuAppBar />
      <main>
        {children}
      </main>
    </SnackbarProvider>
  )
}

export default Layout
