import React, { useEffect } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import useMessages from '../Messages/Messages';

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const messages = useMessages();

  useEffect(() => {
    
  }, [])

  return (
    <div className='h-screen w-screen flex flex-col overflow-x-hidden overflow-y-hidden'>
      {messages.messageNodes}
      <Header />
      <div className='w-full flex-grow'>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;