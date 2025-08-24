'use client'

import { StateType } from './state'
import { _useStore } from './StoreProvider'


const useStore = () => _useStore<StateType>(state => state)


export default useStore
