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
    messages.showInformationMessage('You\'r welcome to ERPGG. Where you can play while you work.');
    //messages.showConfirmMessage(() => { });
    //messages.showErrorMessage('There is not error. It\' just a joke.');
    // messages.showLoading();

    // setTimeout(() => {
    //   messages.hideLoading();
    //   messages.showSucess();
    // }, 3000);

    // setTimeout(() => {
    //   messages.hideSucess();
    // }, 6000);
  }, [])

  return (
    <div className='h-screen w-screen flex flex-col'>
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