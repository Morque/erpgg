import React from 'react';

interface FooterProps {
  children?: any
  // Define las props aquí
}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <div className='absolute bottom-0 w-screen h-12 border border-gray-300 bg-slate-200 grid grid-cols-4'>
      <div className='text-center my-auto'>
        <span className='text-neutral-700 font-medium'>Servidor: 127.0.0.1</span>
      </div>
    </div>
  );
}

export default Footer;