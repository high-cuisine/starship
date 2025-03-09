import { useEffect, useState } from 'react';
import cls from './Header.module.scss';
import { useUserStore } from '../../../../features/store/useUserStore';

interface HeaderProps {
    link:string;
}

const Header = ({link}:HeaderProps) => {

    const [inputLink, setInputLink] = useState(link);
    const { setInviteLink } = useUserStore();

    console.log(link);
    
    const changeInviteLink = (e:string) => {

        setInviteLink(e);
        setInputLink(e);
    }

    useEffect(() => {
        setInputLink(link);
    }, [])

    return (
        <div>
            <h2 className={cls.title}>Referrals</h2>
            <div className={cls.link}>
                <input
                    value={inputLink} 
                    placeholder='My invite link: '
                    onChange={(e) => changeInviteLink(e.target.value)}    
                ></input>
                <button className={cls.button}>Сopy</button>
            </div>
        </div>
    )
}

export { Header }