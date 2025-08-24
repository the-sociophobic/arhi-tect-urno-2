import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import Scene from './components/Scene'
import QueryWrapper from './components/QueryWrapper'
// import { Store } from './components/Store/Store'
// import { StoreProvider } from './components/Store/StoreProvider'
import { StoreProvider } from './hooks/useStore/StoreProvider'

import './assets/styles/index.sass'


const App: FC = () => {
  // const store = new Store()

  return (
    <QueryWrapper>
      {/* <StoreProvider store={store}> */}
      <StoreProvider>
        <AppInners />
      </StoreProvider>
    </QueryWrapper>
  )
}


export default App


const AppInners: FC = observer(() => {
  return (
    <div className='App'>
      <div className='Scene__container'>
        <Scene />
      </div>
    </div>
  )
})
