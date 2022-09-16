import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

const shownNewCardContext = createContext<boolean>(false)
const setShownNewCardContext = createContext<Dispatch<SetStateAction<boolean>>>(() => undefined)

export const useMyAppContext = () => {
  const shownNewCard = useContext(shownNewCardContext)
  const setShownNewCard = useContext(setShownNewCardContext)

  return {
    shownNewCard,
    setShownNewCard
  }
}

const MyAppContextProvider: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  const [shownNewCard, setShownNewCard] = useState(false)

  return (
    <shownNewCardContext.Provider value={shownNewCard}>
      <setShownNewCardContext.Provider value={setShownNewCard}>
        {children}
      </setShownNewCardContext.Provider>
    </shownNewCardContext.Provider>
  )
}

export default MyAppContextProvider
