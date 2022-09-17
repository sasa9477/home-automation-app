import { ReactNode } from 'react';

import MenuAppBar from './MenuAppBar';

type LayoutProps = {
  readonly children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <>
      <MenuAppBar />
      <main>
        {children}
      </main>
    </>
  )
}

export default Layout
