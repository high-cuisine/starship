import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './AppRouter'
import { useUserStore } from './features/store/useUserStore'
import { useEffect } from 'react';
import { AliveScope } from 'react-activation';

function App() {

  const {setUser} = useUserStore();

  useEffect(() => {
    setUser({coins:10000000000, inviteLink:'example'})
  }, [])
  
  return (
    <>
    <BrowserRouter>
      <AliveScope>
        <AppRouter></AppRouter>
      </AliveScope>
    </BrowserRouter>
    </>
  )
}

export default App
