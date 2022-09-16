import { ReactNode } from 'react';

import MenuAppBar from './MenuAppBar';
import MyAppContextProvider from './MyAppContextProvider';

type LayoutProps = {
  readonly children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <>
      <MyAppContextProvider>
        <MenuAppBar />
        <main>
          {children}
        </main>
      </MyAppContextProvider>
    </>
  )
}

export default Layout
