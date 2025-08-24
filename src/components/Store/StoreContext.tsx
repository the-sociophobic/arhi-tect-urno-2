import { createContext } from 'react'

import { IStore } from './store.interface'


export type StoreContextType = {
  store: IStore
}


export const StoreContext = createContext<StoreContextType>({} as StoreContextType)
