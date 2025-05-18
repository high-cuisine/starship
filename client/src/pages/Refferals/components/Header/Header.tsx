import { useEffect, useState } from 'react';
import cls from './Header.module.scss';
import { useUserStore } from '../../../../features/store/useUserStore';

interface HeaderProps {
    link:string;
}

const Header = ({link}:HeaderProps) => {

    const [inputLink, setInputLink] = useState(link);
    const { setInviteLink } = useUserStore();
    
    const changeInviteLink = (e:string) => {

        return;
        setInviteLink(e);
        setInputLink(e);
    }

    useEffect(() => {
        setInputLink(`https://t.me/Worldcoin2025_bot?start=${link}`);
    }, [])

    async function copyToClipboard(text:string) {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const tmp = document.createElement('textarea');
          tmp.value = text;
          tmp.style.position = 'fixed';
          document.body.append(tmp);
          tmp.select();
          document.execCommand('copy');
          tmp.remove();
        }
      }

      function sendLink() {
        const inviteLink = `https://t.me/Worldcoin2025_bot?start=${link}`
        const url = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}`;
        window.open(url, '_blank');
      }

    return (
        <div>
            <h2 className={cls.title}>Referrals</h2>
            <div className={cls.link}>
                <input
                    value={inputLink} 
                    placeholder='My invite link: '
                    onChange={(e) => changeInviteLink(e.target.value)}    
                ></input>
                <div className={cls.buttons}>
                    <button className={cls.button} onClick={() => copyToClipboard(inputLink)}>Сopy</button>
                    <button className={cls.button} onClick={() => sendLink()}>Send</button>
                </div>
            </div>
        </div>
    )
}

export { Header }