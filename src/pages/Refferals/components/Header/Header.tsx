import { useState } from 'react';
import cls from './Header.module.scss';

interface HeaderProps {
    link:string;
}

const Header = ({link}:HeaderProps) => {

    const [inputLink, setInputLink] = useState(link);

    return (
        <div>
            <h2 className={cls.title}>Referrals</h2>
            <div className={cls.link}>
                <input
                    value={inputLink} 
                    placeholder='My invite link: '
                    onChange={(e) => setInputLink(e.target.value)}    
                ></input>
                <button className={cls.button}>Сopy</button>
            </div>
        </div>
    )
}

export { Header }