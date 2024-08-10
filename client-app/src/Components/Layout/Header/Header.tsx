import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { urlApi } from '../../../Providers/API';
import { anonimous_icon } from '../../../Assets/images';
import MenuHeader from './MenuHeader';
import './Header.css';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  children?: any
  // Define las props aquí
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [model, setModel] = useState<Array<any>>();
  const [userName, setUserName] = useState<string>('');
  const [menuProfileOpen, setMenuProfileOpen] = useState<boolean>(false);
  const token = Cookies.get('SSID');
  const navigate = useNavigate();

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

  const logOutClick = () => {
    navigate('/login', { replace: true });
  }

  useEffect(() => {
    fetchModel();
    const first_name = Cookies.get('first_name') ?? '';
    setUserName(first_name);

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  const menus = [
    { displayText: 'Admin', children: '' },
    { displayText: 'Clientes', children: '' },
    { displayText: 'Facturas', children: '' },
    { displayText: 'Comercial', children: '' },
    { displayText: 'Finanzas', children: '' },
    { displayText: 'Almacen', children: '' },
    { displayText: 'Almacen 1', children: '' },
    { displayText: 'Almacen 2', children: '' },
    { displayText: 'Almacen 3', children: '' },
    { displayText: 'Almacen 4', children: '' },
    { displayText: 'Almacen 5', children: '' },
    { displayText: 'Almacen 6', children: '' },
    { displayText: 'Almacen 7', children: '' },
    { displayText: 'Almacen 8', children: '' },
    { displayText: 'Almacen 9', children: '' },
    { displayText: 'Almacen 10', children: '' },
    { displayText: 'Almacen 11', children: '' },
    { displayText: 'Almacen 12', children: '' },
    { displayText: 'Almacen 13', children: '' },
    { displayText: 'Almacen 14', children: '' },
    { displayText: 'Almacen 15', children: '' },
    { displayText: 'Almacen 16', children: '' },
  ]

  return (
    <div className='w-screen h-16 bg-slate-200 border border-gray-300 grid grid-cols-2 md:grid-cols-6 shadow-md shadow-gray-200'>
      <a href='/' className='mx-12 my-auto text-xl text-zinc-600 font-semibold'>TutoSite</a>
      <div className='max-md:hidden grid-cols-subgrid col-span-4 my-auto'>
        <MenuHeader listMenus={menus} />
      </div>
      <div className='text-center my-auto'>
        <div className='' onClick={OpenProfileMenu}>
          <a className='text-zinc-600 inline-block font-serif cursor-pointer'>Hola, {userName}</a>
          <img className='inline-block w-7 ml-3 cursor-pointer' src={anonimous_icon} />
        </div>
        {
          menuProfileOpen && (
            <div
              ref={menuProfileContainerRef}
              className='animate-fade-down animate-duration-500 animate-ease-out absolute right-4 xl:right-24 w-1/2 sm md:w-1/6 xl:w-1/12 '>
              <div className='banderin mx-auto'></div>
              <div className='rounded-md shadow-xl bg-slate-400 text-white py-2 flex flex-col items-center gap-2'>
                <button className=''>Mi perfil</button>
                <button className='' onClick={logOutClick}>Cerrar sesion</button>
              </div>
            </div>
          )
        }
      </div>
    </div >
  );
}

export default Header;
