import { ReactNode, useEffect, useRef, useState } from "react";
import { confirm_gif, loading_gif, loading_gif_white } from "../../Assets/images";


const useMessages = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSucess, setIsSucess] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [onAccept, setOnAccept] = useState<voidFunction | undefined>(undefined);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [messageInfo, setMessageInfo] = useState('');
    const [isInfo, setIsInfo] = useState(false);

    const errorRef = useRef<HTMLButtonElement>(null);
    const confirmRef = useRef<HTMLButtonElement>(null);
    const InfoRef = useRef<HTMLButtonElement>(null);
    const confirmContainerRef = useRef<HTMLDivElement>(null);
    const ErrorContainerRef = useRef<HTMLDivElement>(null);
    const LoadingContainerRef = useRef<HTMLDivElement>(null);
    const SuccessContainerRef = useRef<HTMLDivElement>(null);
    const InfoContainerRef = useRef<HTMLDivElement>(null);

    type voidFunction = () => void;

    const clearConsole = () => {
        setIsLoading(false);
        setIsSucess(false);
        setIsError(false);
        setIsInfo(false);
        setIsConfirm(false);
    }

    const ShowLoading = () => {
        clearConsole();
        setIsLoading(true);
    }

    const HideLoading = () => {
        LoadingContainerRef.current?.classList.remove('animate-fade-down');
        LoadingContainerRef.current?.classList.remove('animate-ease-out');

        LoadingContainerRef.current?.classList.add('animate-jump-in');
        LoadingContainerRef.current?.classList.add('animate-ease-in-out');
        LoadingContainerRef.current?.classList.add('animate-reverse');
        LoadingContainerRef.current?.classList.add('animate-duration-300');

        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    }

    const ShowSucess = () => {
        clearConsole();
        setIsSucess(true);
    }

    const HideSucess = () => {
        SuccessContainerRef.current?.classList.remove('animate-fade-down');
        SuccessContainerRef.current?.classList.remove('animate-ease-out');

        SuccessContainerRef.current?.classList.add('animate-jump-in');
        SuccessContainerRef.current?.classList.add('animate-ease-in-out');
        SuccessContainerRef.current?.classList.add('animate-reverse');
        SuccessContainerRef.current?.classList.add('animate-duration-300');

        setTimeout(() => {
            setIsSucess(false);
        }, 300);
    }

    const ShowErrorMessage = (errorMessage: string) => {
        clearConsole();
        setErrorMessage(errorMessage);
        setIsError(true);
    }

    const ShowConfirmMessage = (onAccept: voidFunction | undefined) => {
        clearConsole();
        if (typeof onAccept === 'function') {
            setOnAccept(() => onAccept)
            setIsConfirm(true);
        }
        else {
            throw Error('onAccept must be a function type: () => void');
        }
    }

    const hideErrorMessage = () => {
        ErrorContainerRef.current?.classList.remove('animate-jump-in');
        ErrorContainerRef.current?.classList.remove('animate-ease-out');
        ErrorContainerRef.current?.classList.remove('animate-duration-300');

        ErrorContainerRef.current?.classList.add('animate-jump-out');
        ErrorContainerRef.current?.classList.add('animate-ease-out');
        ErrorContainerRef.current?.classList.add('animate-duration-300');

        setTimeout(() => {
            setIsError(false);
            setErrorMessage('');
        }, 200);
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
        confirmContainerRef.current?.classList.remove('animate-jump-in');
        confirmContainerRef.current?.classList.remove('animate-ease-out');
        confirmContainerRef.current?.classList.remove('animate-duration-300');

        confirmContainerRef.current?.classList.add('animate-jump-out');
        confirmContainerRef.current?.classList.add('animate-ease-out');
        confirmContainerRef.current?.classList.add('animate-duration-300');
  
        setTimeout(() => {
            setIsConfirm(false);
        }, 200);
    }

    const ShowInformationMessage = (message: string) => {
        clearConsole();
        setMessageInfo(message);
        setIsInfo(true);
    }

    const HideInformationMessage = () => {
        InfoContainerRef.current?.classList.remove('animate-jump-in');
        InfoContainerRef.current?.classList.remove('animate-ease-out');
        InfoContainerRef.current?.classList.remove('animate-duration-300');

        InfoContainerRef.current?.classList.add('animate-jump-out');
        InfoContainerRef.current?.classList.add('animate-ease-out');
        InfoContainerRef.current?.classList.add('animate-duration-300');

        setTimeout(() => {
            setIsInfo(false);
        }, 300);
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
                        <div
                            ref={LoadingContainerRef}
                            className="w-2/3 md:w-1/4 h-16 max-w-64 bg-white text-neutral-600 font-medium flex flex-row items-center justify-center rounded-lg shadow-md shadow-zinc-900 animate-fade-down animate-ease-in-out">
                            <img src={loading_gif_white} alt="loading_gif" className="w-10 mr-5" />
                            <span>Cargando</span>
                        </div>
                    </div>
                )
            }
            {
                isSucess && (
                    <div className="fixed w-screen h-screen flex flex-col justify-center items-center bg-gray-900/50 z-10">
                        <div
                            ref={SuccessContainerRef}
                            className="w-2/3 md:w-1/4 h-16 max-w-64 bg-white text-neutral-600 font-medium flex flex-row items-center justify-center rounded-lg shadow-md shadow-zinc-900 animate-fade-down animate-ease-in-out">
                            <img src={confirm_gif} alt="loading_gif" className="w-10 mr-5" />
                            <span>¡Exito!</span>
                        </div>
                    </div>
                )
            }
            {
                isError && (
                    <div className="fixed w-screen h-screen flex flex-col justify-center items-center bg-gray-900/50 z-10">
                        <div
                            ref={ErrorContainerRef}
                            className="w-2/3 md:w-1/4 bg-zinc-300 text-neutral-600 flex flex-col items-center justify-center rounded-lg shadow-md shadow-zinc-900 animate-jump-in animate-ease-out animate-duration-300">
                            <div className="border-b border-b-zinc-400 w-full drop-shadow-md">
                                <h4 className="text-red-500 text-2xl mx-6 my-2">Error</h4>
                            </div>
                            <div className="border-b border-b-zinc-400 bg-white text-start w-full p-6">
                                <p>{errorMessage}</p>
                            </div>
                            <div className="p-2">
                                <button
                                    ref={errorRef}
                                    onClick={hideErrorMessage}
                                    className="px-6 py-2 bg-slate-600 text-white rounded-lg border border-slate-600 hover:bg-neutral-50 hover:text-slate-600 hover:border transition-colors duration-200">Ok</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                isConfirm && (
                    <div className="fixed w-screen h-screen flex flex-col justify-center items-center bg-gray-900/50 z-10">
                        <div
                            ref={confirmContainerRef}
                            className="w-11/12 md:w-2/3 lg:w-1/4 bg-zinc-300 flex flex-col items-center justify-center rounded-lg shadow-md shadow-zinc-900 animate-jump-in animate-ease-out animate-duration-300">
                            <div className="border-b border-b-zinc-400 w-full drop-shadow-md">
                                <h4 className="text-yellow-300  text-2xl mx-6 my-2">Precaución</h4>
                            </div>
                            <div className="border-b border-b-zinc-400 text-start w-full p-6 bg-white">
                                <p>¿Esta seguro de realizar la siguiente acción?</p>
                            </div>
                            <div className="p-2">
                                <button
                                    ref={confirmRef}
                                    onClick={onConfirmMessage}
                                    className="w-full xl:w-max px-6 py-2 mr-4 bg-green-700 text-white rounded-lg border border-slate-600 hover:bg-neutral-50 hover:text-green-900 hover:border transition-colors duration-200">Confirmar</button>
                                <button
                                    onClick={hideConfirmMessage}
                                    className="w-full mt-2 xl:w-max xl:mt-0 px-6 py-2 bg-zinc-500 text-white rounded-lg border border-slate-600 hover:bg-neutral-50 hover:text-slate-600 hover:border transition-colors duration-200">Cancelar</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                isInfo && (
                    <div className="fixed w-screen h-screen flex flex-col justify-center items-center bg-gray-900/50 z-10">
                        <div
                            ref={InfoContainerRef}
                            className="w-2/3 md:w-1/4 bg-zinc-300 text-neutral-600 flex flex-col items-center justify-center rounded-lg shadow-md shadow-zinc-900 animate-jump-in animate-ease-out animate-duration-300">
                            <div className="border-b border-b-zinc-400 w-full">
                                <h4 className="text-neutral-600 text-2xl mx-6 my-2">Información</h4>
                            </div>
                            <div className="border-b border-b-zinc-400 bg-white text-start w-full p-6">
                                <p>{messageInfo}</p>
                            </div>
                            <div className="p-2">
                                <button
                                    ref={InfoRef}
                                    onClick={HideInformationMessage}
                                    className="px-6 py-2 bg-slate-600 border border-slate-600 text-white rounded-lg hover:bg-neutral-50 hover:text-slate-600 hover:border transition-colors duration-200">Ok</button>
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
        showInformationMessage: ShowInformationMessage
    };
}

export default useMessages;