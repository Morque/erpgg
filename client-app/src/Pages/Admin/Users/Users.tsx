import React from 'react';
import Layout from '../../../Components/Layout/Layout';
import MenuUsers from './children/MenuUsers';
import ContainerUsers from './children/ContainerUsers';

interface UsersProps {
  children?: any
}

const Users: React.FC<UsersProps> = ({ children }) => {
  
  
    return (
    <Layout>
      <div className='grid grid-cols-1 p-3 md:grid-cols-12 h-full'>
        <MenuUsers />
        <ContainerUsers />
      </div>
    </Layout>
  );
}

export default Users;
