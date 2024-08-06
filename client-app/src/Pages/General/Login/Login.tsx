import React, { useState, ChangeEvent } from 'react';
import useMessages from '../../../Components/Messages/Messages';
import axios from 'axios';
import { urlApi } from '../../../Providers/API';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface LoginProps {
    children?: any
    // Define las props aquí
}

const Login: React.FC<LoginProps> = ({ children }) => {
    const [loginData, setLoginData] = useState({ user: '', password: '' });
    const messages = useMessages();
    const navigate = useNavigate();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setLoginData(prevData => ({ ...prevData, [name]: value }));
    }

    const handleOnClicklogin = async () => {
        messages.showLoading();

        try {
            const { status, data } = await axios.post(`${urlApi}/login`, loginData);

            if (status == 200) {
                Cookies.set('SSID', data.ssid);
                Cookies.set('first_name', data.first_name);
                Cookies.set('last_name', data.last_name);
                messages.hideLoading();
                messages.showSucess();
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        } catch (error) {
            messages.hideLoading();
            messages.showErrorMessage('Usuario o contraseña no correctos.');
        }
    }

    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center bg-slate-50'>
            {messages.messageNodes}
            <div className='h-1/3 w-1/3 max-w-80 bg-slate-200 rounded-lg flex flex-col items-center justify-center shadow-md shadow-slate-700 min-w-64 min-h-60'>
                <h4 className='text-xl text-slate-800 mb-6'>Ingresar</h4>
                <div
                    className='flex flex-col items-center justify-center w-3/4'
                >
                    <input
                        placeholder='User'
                        type='text'
                        name='user'
                        value={loginData.user}
                        onChange={handleOnChange}
                        className='rounded-md p-2 border w-full border-gray-400 bg-white text-center mb-2 shadow-sm shadow-zinc-700' />
                    <input
                        placeholder='Password'
                        type='password'
                        name='password'
                        value={loginData.password}
                        onChange={handleOnChange}
                        className='rounded-md p-2 border w-full border-gray-400 text-center shadow-sm shadow-zinc-700' />
                    <button
                        onClick={handleOnClicklogin}
                        className='mt-4 bg-cyan-950 text-white py-2 w-full rounded-lg shadow-sm shadow-zinc-700'>Entrar</button>
                </div>
            </div>
        </div>
    );
}

export default Login;