import React from 'react'

import { StoreContext, StoreContextType } from './StoreContext'


export type StoreProviderProps = StoreContextType & { children: React.ReactNode }


export const StoreProvider: React.FC<StoreProviderProps> = ({
  store,
  children,
}) => {
  return (
    <StoreContext.Provider value={{ store }}>
      {children}
    </StoreContext.Provider>
  )
}
