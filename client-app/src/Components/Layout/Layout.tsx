import React, { useContext, useEffect } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { AlertsContext } from '../../App';



interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const messages = useContext(AlertsContext);

  useEffect(() => {

  }, [])

  return (
    <>
      {messages.messageNodes}
      <div className='h-screen w-screen flex flex-col overflow-x-hidden overflow-y-hidden'>
        <Header />
        <div className='w-full flex-grow'>
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;