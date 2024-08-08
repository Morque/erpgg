import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { urlApi } from '../../../Providers/API';
import { anonimous_icon } from '../../../Assets/images';
import MenuHeader from './MenuHeader';
import './Header.css';

interface HeaderProps {
  children?: any
  // Define las props aquí
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [model, setModel] = useState<Array<any>>();
  const [userName, setUserName] = useState<string>('');
  const [menuProfileOpen, setMenuProfileOpen] = useState<boolean>(false);
  const token = Cookies.get('SSID');

  const menuProfileContainerRef = useRef<HTMLDivElement>(null);

  const fetchModel = async () => {
    if (token) {
      try {
        
      } catch (error) {

      }
    }
  }

  const OpenProfileMenu = () => {
    if (menuProfileOpen) {
      CloseProfileMenu();
    }
    else {
      setMenuProfileOpen(true);
    }
  }

  const CloseProfileMenu = () => {
    menuProfileContainerRef.current?.classList.remove('animate-fade-down');
    menuProfileContainerRef.current?.classList.remove('animate-duration-500');
    menuProfileContainerRef.current?.classList.remove('animate-ease-out');

    setTimeout(() => {
      menuProfileContainerRef.current?.classList.add('animate-fade-down');
      menuProfileContainerRef.current?.classList.add('animate-reverse');
      menuProfileContainerRef.current?.classList.add('animate-duration-300');
      menuProfileContainerRef.current?.classList.add('animate-ease-out');
    }, 100);

    setTimeout(() => {
      setMenuProfileOpen(false);
    }, 400);
  }

  const handleClickOutside = (event: MouseEvent): any => {
    if (menuProfileContainerRef.current && !menuProfileContainerRef.current.contains(event.target as Node)) {
      CloseProfileMenu();
    }
  };

  useEffect(() => {
    fetchModel();
    const first_name = Cookies.get('first_name') ?? '';
    setUserName(first_name);

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  return (
    <div className='w-screen h-16 bg-slate-200 border border-gray-300 grid grid-cols-2 md:grid-cols-6 shadow-md shadow-gray-200'>
      <h4 className='mx-12 my-auto text-xl text-zinc-600 font-semibold'>TutoSite</h4>
      <div className='max-md:hidden grid-cols-subgrid col-span-4 my-auto'>
        <MenuHeader />
      </div>
      <div className='text-center my-auto'>
        <div className='group' onClick={OpenProfileMenu}>
          <a className='text-zinc-600 inline-block font-serif '>Hola, {userName}</a>
          <img className='inline-block w-7 ml-3 group-hover:shadow-sm group-hover:shadow-neutral-700 rounded-full' src={anonimous_icon} />
        </div>
        {
          menuProfileOpen && (
            <>
              <div
                ref={menuProfileContainerRef}
                className='animate-fade-down animate-duration-500 animate-ease-out absolute right-4 w-1/3 md:w-1/6 xl:w-2/12 '>
                <div className='banderin mx-auto'></div>
                <div className='rounded-sm shadow-xl bg-white border border-gray-300 py-2'>
                <span>Mi perfil</span>
                </div>
              </div>
            </>
          )
        }
      </div>
    </div >
  );
}

export default Header;
