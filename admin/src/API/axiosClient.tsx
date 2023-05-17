import axios, { AxiosRequestConfig } from 'axios';
import { config } from '../Configs';
import { clearStoredAuth, getStoredAuth } from '../Utils/helper/localStorage';

const token = getStoredAuth();

console.log(token);

const instance = axios.create({
    baseURL: 'http://localhost:3001',
    timeoutErrorMessage: '🚧🚧🚧 Server connection time out !',
    headers: {
        Accept: 'application/json',
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        responseEncoding: 'utf8',
        responseType: 'json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*',
        'X-Application': 'web app',
        'X-Version': '1.0.1',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
    },
});

export const instanceRequest = (options: AxiosRequestConfig) => {
    const token = getStoredAuth();
    instance.defaults.headers.common.Authorization = `Bearer ${token}` || undefined;

    const onSuccess = (response: any) => {
        // logger.debug('Response API:', response?.data);
        return response?.data;
    };
    const onError = async (error: any) => {
        if (error?.response?.status === 401) {
            //  if(error?.response?.data. )
            clearStoredAuth();
            window.location.href = window.location.origin;
        }
        // logger.debug('Axios Options:', options);
        // optionally catch errors and add additional logging here
        await Promise.reject({
            statusCode: error?.response?.data?.statusCode,
            message: error?.response?.data?.message,
            statusText: error?.response?.statusText,
            status: error?.response?.status,
            data: error?.response?.data?.data || null,
        });
    };
    return instance(options).then(onSuccess).catch(onError);
};
