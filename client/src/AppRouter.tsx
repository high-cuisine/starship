import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { GamePage } from "./pages/GamePage/GamePage"
import { Refferals } from "./pages/Refferals/Refferals"
import { PLanets } from "./pages/Planets/Planets"
import { Daily } from "./pages/Daily/Daily"
import { Menu } from "./layout/Menu/Menu"
import { useEffect, useRef, useState } from "react";
import { Boost } from "./pages/Boost/Boost"
import { Tasks } from "./pages/Tasks/Tasks"
import back from './assets/icons/back.png';
import audioOn from './assets/icons/soundOn.png';
import audioOff from './assets/icons/soundOff.png';
import eventBus from "./pages/GamePage/components/core/EventBus"
import cls from './AppRouter.module.scss'
import loadImage from './assets/images/load.png'
import { isMobile } from "react-device-detect"
import audio from './assets/audio/back.mp3'
import { useUserStore } from "./features/store/useUserStore"

const bg = './backgrounds/background.jpg';

declare global {
    interface Window {
        Telegram?: {
            WebApp?: {
                ready(): unknown;
                initData: string;
                initDataUnsafe?: {
                    user?: {
                        id: number;
                        first_name: string;
                        username:string;
                    };
                };
                HapticFeedback?: {
                    impactOccurred: (style: 'light' | 'medium' | 'heavy') => void;
                };
                disableVerticalSwipes: () => void;
                shareToStory: (options: {
                  media_url: string;
                  text: string;
                  widget_link: {
                    url: string;
                    name: string;
                  };
                }) => void;
                expand: () => void;
                isExpanded?: boolean;
                onEvent: (event: string, callback: (data: Record<string, unknown>) => void) => void;
                offEvent: (event: string) => void;
            };
        };
        TelegramWebviewProxy?: {
            postEvent: (eventType: string, eventData: unknown) => void;
        };
    }
  }

 

const AppRouter = () => {

    const [isSound, setIsSound] = useState({
        state:'off',
        audio:audioOff
    });
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const overlayRef = useRef<null | HTMLDivElement>(null);
    const user = useUserStore(state => state.user);
    const navigate = useNavigate()

    useEffect(() => {
        document.documentElement.style.setProperty("--golbalBg", `url(${bg})`);

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)

        eventBus.on('background', (background) => {
            document.documentElement.style.setProperty("--golbalBg", `url(${background})`);
            if(overlayRef.current) {
                overlayRef.current.style.backgroundImage = `url(${background})`;
                overlayRef.current.style.backgroundSize = 'cover';
            }
          })

          eventBus.on('changeState', (sound:'off' | 'on') => {
            if(sound === 'on') {
                if(isSound.state === 'on') {
                    setIsSound({
                        state:'off',
                        audio: audioOff
                    });
                    if(audioRef.current)
                        audioRef.current.pause();
                }
                else {
                    setIsSound({
                        state:'on',
                        audio: audioOn
                    });
                    if(audioRef.current)
                        audioRef.current.play();
                }
            }
        });
    }, [])

    function changeSoundState() {
        console.log(isSound)
        if(isSound.state === 'on') {
            setIsSound({
                state:'off',
                audio: audioOff
            });
            if(audioRef.current)
                audioRef.current.pause();

        }
        else {
            setIsSound({
                state:'on',
                audio: audioOn
            });
            if(audioRef.current)
                audioRef.current.play();
        }
    }

    useEffect(() => {
        if(location.pathname !== '/game') {
            eventBus.emit('background', bg)
        }
    }, [location.pathname])

    useEffect(() => {
        if(Number(user?.daysActive) >= 1) {
            navigate('/daily')
        }
    }, [user])

    return(
        <div className={'overlay'} ref={overlayRef}>
            {
                loading && 
                <img className={cls.loading} src={loadImage}></img>
            }
            <div className={cls.SoundController} style={{top: isMobile ? '5vh' : '20px'}} onClick={() => changeSoundState()}>
                <img src={isSound.audio}></img>
            </div>

            <div className={cls.BackController} style={{top: isMobile ? '5vh' : '20px'}} onClick={() => window.history.back()}>
                <img src={back}></img>
            </div>
         
            <Routes>
                <Route path="/game" element={<GamePage></GamePage>}></Route>
                <Route path="/invites" element={<Refferals></Refferals>}></Route>
                <Route path="/" element={<PLanets></PLanets>}></Route>
                <Route path="/daily" element={<Daily/>}></Route>
                <Route path="/ref" element={<Refferals/>}></Route>
                <Route path="/boost" element={<Boost/>}></Route>
                <Route path="/task" element={<Tasks/>}></Route>
            </Routes>
            <Menu></Menu>
            <audio ref={audioRef} src={audio} preload="auto" />
        </div>
    )
}

export { AppRouter }