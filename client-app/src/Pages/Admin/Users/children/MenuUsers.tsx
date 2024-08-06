import React from 'react';

interface MenuUsersProps {
    children?: any
    // Define las props aquí
}

const MenuUsers: React.FC<MenuUsersProps> = ({ children }) => {
    return (
        <div className='border-r border-gray-200 grid-cols-subgrid col-span-2 p-2'>
            <p className='text-xl mb-5 text-neutral-500'>Opciones</p>
            <ul className='m-0 p-0'>
                <li className='text-gray-600 mt-1 hover:bg-slate-200 w-full'>item 1</li>
                <li className='text-gray-600 mt-1 hover:bg-slate-200 w-full'>item 2</li>
                <li className='text-gray-600 mt-1 hover:bg-slate-200 w-full'>item 3</li>
            </ul>
        </div>
    );
}

export default MenuUsers;