import { useCallback, useState } from 'react';
import { $host } from './index';

//Работает
export const useHttpArchivariusConnection = () => {
    const [loading, setLoading] = useState(false);
    const request = useCallback(
        async ({ serverIp, serverPort }) => {
            setLoading(true);
            try {
                const { data } = await $host.post('/archivarius/connection', { serverIp, serverPort });
                setLoading(false);
                return data;
            } catch (e) {
                setLoading(false);
                return { error: 404, message: 'Сервер не запущен!' };
            }
        }, []
    )
    return { loading, request };
}

export const useHttpArchivariusStart = () => {
    const [loading, setLoading] = useState(false);
    const request = useCallback(
        async (serverIp, serverPort, textFile, optionId, optionTitle) => {
            setLoading(true);
            try {
                const { data } = await $host.post('/archivarius/start', { serverIp, serverPort, textFile, optionId, optionTitle });
                setLoading(false);
                return data;
            } catch (e) {
                setLoading(false);
                return { error: 404, message: 'Сервер не запущен!' };
            }
        }, []
    )
    return { loading, request };
}








/* export const useHttpArchivariusStart = async () => {
    console.log('useArchivariusStart');

    const [loading, setLoading] = useState(false);
    const request = useCallback(
        async ({ settings, textFile, option  }) => {
            setLoading(true);
            try {
                //const { data } = await $host.post('/archivarius/start', { settings, textFile, option });
                console.log('useArchivariusStart');
                setLoading(false);
                return;
            } catch (e) {
                setLoading(false);
                return { error: 404, message: 'Сервер не запущен!' };
            }
        }, []
    )
    return { loading, request };
} */



//работает можно удалить. использую хуки
export const archivariusConnection = async ({ serverIp, serverPort }) => {
    console.log('archivariusConnection');
    try {
        const { data } = await $host.post('/archivarius/connection', { serverIp, serverPort });
        return data;
    } catch (e) {
        return { error: 404, message: 'Сервер не запущен!' }
    }

}


export const archivariusStartDEL = async ({ settings, nameFile, textFile, option }) => {
    console.log('archivariusStart');
    try {
        const { data } = await $host.post('/archivarius/start', { settings, nameFile, textFile, option });
        return data;
    } catch (e) {
        return { error: 404, message: 'какая-то ошибка' }
    }
}