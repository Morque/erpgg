import React from 'react';

interface ContainerUsersProps {
  children?: any
  // Define las props aquí
}

const ContainerUsers: React.FC<ContainerUsersProps> = ({ children }) => {
  return (
    <div className='grid-cols-subgrid col-span-10 p-5'>
      <h1>Principal</h1>
    </div>
  );
}

export default ContainerUsers;