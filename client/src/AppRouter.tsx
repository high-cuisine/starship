import { Route, Routes } from "react-router-dom"
import { GamePage } from "./pages/GamePage/GamePage"
import { Refferals } from "./pages/Refferals/Refferals"
import { PLanets } from "./pages/Planets/Planets"
import { Daily } from "./pages/Daily/Daily"
import { Menu } from "./layout/Menu/Menu"
import { useEffect } from "react";
import bg from './assets/backgrounds/background.jpg';
import { Boost } from "./pages/Boost/Boost"
import { Tasks } from "./pages/Tasks/Tasks"

const AppRouter = () => {

    useEffect(() => {
        document.documentElement.style.setProperty("--golbalBg", `url(${bg})`);
    }, [])

    return(
        <div className={'overlay'}>
           
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
        </div>
    )
}

export { AppRouter }