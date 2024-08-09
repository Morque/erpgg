import React from 'react';
import { left_arrow, right_arrow } from '../../../Assets/images';

interface MenuHeaderProps {
  children?: any
  // Define las props aquí
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ children }) => {
  return (
    <div className='h-full w-full flex flex-row justify-around border-l border-r border-gray-400 '>
      <div className='flex justify-center items-center my-auto'>
        <img src={left_arrow} className='w-5/12'/>
      </div>
      <h2 className='text-slate-600 hover:text-slate-400 cursor-pointer'>Admin</h2>
      <h2 className='text-slate-600 hover:text-slate-400 cursor-pointer'>Clientes</h2>
      <h2 className='text-slate-600 hover:text-slate-400 cursor-pointer'>Comercial</h2>
      <h2 className='text-slate-600 hover:text-slate-400 cursor-pointer'>Fianzas</h2>
      <h2 className='text-slate-600 hover:text-slate-400 cursor-pointer'>Operaciones</h2>
      <div className='flex justify-center items-center'>
        <img src={right_arrow} className='w-5/12'/>
      </div>
    </div>
  );
}

export default MenuHeader;