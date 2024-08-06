import { ReactNode, useEffect, useRef, useState } from "react";
import { confirm_gif, loading_gif, loading_gif_white } from "../../Assets/images";


const useMessages = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSucess, setIsSucess] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [onAccept, setOnAccept] = useState<voidFunction | undefined>(undefined);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const errorRef = useRef<HTMLButtonElement>(null);
    const confirmRef = useRef<HTMLButtonElement>(null);

    type voidFunction = () => void;

    const ShowLoading = () => {
        setIsLoading(true);
    }

    const HideLoading = () => {
        setIsLoading(false);
    }

    const ShowSucess = () => {
        setIsSucess(true);
    }

    const HideSucess = () => {
        setIsSucess(false);
    }

    const ShowErrorMessage = (errorMessage: string) => {
        setErrorMessage(errorMessage);
        setIsError(true);
    }

    const ShowConfirmMessage = (onAccept: voidFunction | undefined) => {
        if (typeof onAccept === 'function') {
            setOnAccept(() => onAccept)
            setIsConfirm(true);
        }
        else {
            throw Error('onAccept must be a function type: () => void');
        }
    }

    const hideErrorMessage = () => {
        setIsError(false);
        setErrorMessage('');
    }

    const onConfirmMessage = () => {
        if (onAccept !== null) {
            if (typeof onAccept === 'function') {
                onAccept.call(this);
            }
        }

        hideConfirmMessage();
    }

    const hideConfirmMessage = () => {
        setIsConfirm(false);
    }

    useEffect(() => {
        if (isConfirm) confirmRef.current?.focus();
    }, [isConfirm])

    useEffect(() => {
        if (isError) errorRef.current?.focus();
    }, [isError])

    const MessagesNodes = (
        <>
            {
                isLoading && (
                    <div className="fixed w-screen h-screen flex flex-col justify-center items-center bg-gray-900/50 z-10">
                        <div className="w-2/3 md:w-1/4 h-16 max-w-64 bg-white text-neutral-600 font-medium flex flex-row items-center justify-center rounded-lg shadow-md shadow-zinc-900 animate-fade-down animate-ease-in-out">
                            <img src={loading_gif_white} alt="loading_gif" className="w-10 mr-5" />
                            <span>Cargando</span>
                        </div>
                    </div>
                )
            }
            {
                isSucess && (
                    <div className="fixed w-screen h-screen flex flex-col justify-center items-center bg-gray-900/50 z-10">
                        <div className="w-2/3 md:w-1/4 h-16 max-w-64 bg-white text-neutral-600 font-medium flex flex-row items-center justify-center rounded-lg shadow-md shadow-zinc-900 animate-fade-down animate-ease-in-out">
                            <img src={confirm_gif} alt="loading_gif" className="w-10 mr-5" />
                            <span>¡Exito!</span>
                        </div>
                    </div>
                )
            }
            {
                isError && (
                    <div className="fixed w-screen h-screen flex flex-col justify-center items-center bg-gray-900/50 z-10">
                        <div className="w-2/3 md:w-1/4 bg-zinc-300 text-neutral-600 flex flex-col items-center justify-center rounded-lg shadow-md shadow-zinc-900 animate-jump-in animate-ease-out">
                            <div className="border-b border-b-zinc-400 w-full">
                                <h4 className="text-red-500 text-2xl mx-6 my-2">Error</h4>
                            </div>
                            <div className="border-b border-b-zinc-400 bg-white text-start w-full p-6">
                                <p>{errorMessage}</p>
                            </div>
                            <div className="p-2">
                                <button
                                    ref={errorRef}
                                    onClick={hideErrorMessage}
                                    className="px-6 py-2 bg-slate-600 text-white rounded-lg">Ok</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                isConfirm && (
                    <div className="fixed w-screen h-screen flex flex-col justify-center items-center bg-gray-900/50 z-10">
                        <div className="w-2/3 md:w-1/4 bg-zinc-300 flex flex-col items-center justify-center rounded-lg shadow-md shadow-zinc-900 animate-jump-in animate-ease-out">
                            <div className="border-b border-b-zinc-400 w-full">
                                <h4 className="text-zinc-800 text-2xl mx-6 my-2">Información</h4>
                            </div>
                            <div className="border-b border-b-zinc-400 text-start w-full p-6 bg-white">
                                <p>¿Esta seguro de realizar la siguiente acción?</p>
                            </div>
                            <div className="p-2">
                                <button
                                    ref={confirmRef}
                                    onClick={onConfirmMessage}
                                    className="px-6 py-2 mr-4 bg-green-700 text-white rounded-lg">Confirmar</button>
                                <button
                                    onClick={hideConfirmMessage}
                                    className="px-6 py-2 bg-zinc-500 text-white rounded-lg">Cancelar</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )

    return {
        messageNodes: MessagesNodes,
        showLoading: ShowLoading,
        hideLoading: HideLoading,
        showErrorMessage: ShowErrorMessage,
        showConfirmMessage: ShowConfirmMessage,
        showSucess: ShowSucess,
        hideSucess: HideSucess,
    };
}

export default useMessages;