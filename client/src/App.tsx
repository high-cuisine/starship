import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './AppRouter'
import { useUserStore } from './features/store/useUserStore'
import { useEffect } from 'react';
import { AliveScope } from 'react-activation';
import { useLoadImages } from './features/hooks/useLoadImages';
import { isMobile } from 'react-device-detect';
import { createContext, useContext } from 'react';
import { TonConnect, TonConnectUIProvider } from '@tonconnect/ui-react';

const TonConnectContext = createContext<TonConnect | null>(null);
export const useTonConnect = () => useContext(TonConnectContext);

const tonConnect = new TonConnect();

function App() {

  const {login} = useUserStore();
  const { startLoading } = useLoadImages()

  useEffect(() => {
    console.log(window.Telegram?.WebApp?.initDataUnsafe?.user);
    startLoading()
    login(Number(window.Telegram?.WebApp?.initDataUnsafe?.user?.id), String(window.Telegram?.WebApp?.initData))
  }, []);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.disableVerticalSwipes();

      if (!window.Telegram.WebApp.isExpanded) {
        window.Telegram.WebApp.expand();
      }

      setTimeout(() => {
        if(!isMobile) return;
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.onEvent("fullscreen_failed", (error) => {
            console.warn("Fullscreen request failed:", error);
          });
    
          window.Telegram.WebApp.onEvent("fullscreen_changed", (data) => {
            console.log("Fullscreen changed:", data);
          });
        }
      }, 200)

      return () => {
        window.Telegram?.WebApp?.offEvent("fullscreen_failed");
        window.Telegram?.WebApp?.offEvent("fullscreen_changed");
      };
    }

    if(!isMobile) return;
    if (window.TelegramWebviewProxy) {
      window.TelegramWebviewProxy.postEvent('web_app_request_fullscreen', null);
    } else if (typeof window.external !== 'undefined' && 'notify' in window.external && typeof window.external.notify === 'function') {
      (window.external as { notify: (message: string) => void }).notify(JSON.stringify({ eventType: 'web_app_request_fullscreen', eventData: null }));
    } else if (window.parent) {
      window.parent.postMessage(JSON.stringify({ eventType: 'web_app_request_fullscreen', eventData: null }), '*');
    }
  }, []);
  
  return (
    <>
    <TonConnectContext.Provider value={tonConnect}>
      <TonConnectUIProvider manifestUrl={'https://tontickets.ru/tonconnect-manifest.json'}>
        <BrowserRouter>
          <AliveScope>
            <AppRouter></AppRouter>
          </AliveScope>
        </BrowserRouter>
      </TonConnectUIProvider>
    </TonConnectContext.Provider>
    </>
  )
}

export default App
