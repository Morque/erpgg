import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { urlApi } from '../../../Providers/API';
import { anonimous_icon } from '../../../Assets/images';

interface HeaderProps {
  children?: any
  // Define las props aquí
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [model, setModel] = useState<Array<any>>();
  const [userName, setUserName] = useState<string>('');
  const token = Cookies.get('SSID');

  const fetchModel = async () => {
    if (token) {
      try {
        // const { status, data } = await axios.get(`${urlApi}/modelsviews/layout`);
      } catch (error) {

      }
    }
  }

  useEffect(() => {
    fetchModel();
    const first_name = Cookies.get('first_name') ?? '';
    setUserName(first_name);
  }, [])

  return (
    <div className='w-screen h-16 bg-slate-200 border border-gray-300 grid grid-cols-4 shadow-md shadow-gray-200'>
      <h4 className='mx-12 my-auto text-xl text-zinc-600 font-semibold'>TutoSite</h4>
      <div className='grid grid-cols-subgrid col-span-2 text-start my-auto'>
        <a className='text-neutral-600 hover:text-neutral-400'>Admin</a>
      </div>
      <div className='text-center my-auto'>
        <div className='hidden md:block group'>
          <a className='text-zinc-600 inline-block font-serif '>Hola, {userName}</a>
          <img className='inline-block w-7 ml-3 group-hover:shadow-sm group-hover:shadow-neutral-700 rounded-full' src={anonimous_icon} />
        </div>
      </div>
    </div>
  );
}

export default Header;