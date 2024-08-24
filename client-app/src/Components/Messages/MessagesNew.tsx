import React, { SetStateAction, useEffect, useState } from 'react';
import { confirm_gif } from '../../Assets/images';


export const AlertHTMLNode: React.FC = () => {

    const { isSucess } = useSucessAlert();

    useEffect(() => {
        console.log(isSucess);
    },[])

    return (
        <>
            {
                isSucess && (
                    <div className="fixed w-screen h-screen flex flex-col justify-center items-center bg-gray-900/50 z-10">
                        <div
                            // ref={SuccessContainerRef}
                            className="w-2/3 md:w-1/4 h-16 max-w-64 bg-white text-neutral-600 font-medium flex flex-row items-center justify-center rounded-lg shadow-md shadow-zinc-900 animate-fade-down animate-ease-in-out">
                            <img src={confirm_gif} alt="loading_gif" className="w-10 mr-5" />
                            <span>¡Exito!</span>
                        </div>
                    </div>
                )
            }
        </>


    );
}

export const useSucessAlert = () => {
    const [isSucess, setIsSucces] = useState(false);

    const ShowSucessAlert = () => {
        setIsSucces(true);
    }

    const HideSucessAlert = () => {
        setIsSucces(false);
    }

    return {
        isSucess,
        ShowSucessAlert,
        HideSucessAlert
    }
}



