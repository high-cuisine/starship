// index.js
import axios, { InternalAxiosRequestConfig } from 'axios';


//const baseURL = "https://worldcoin2025.space";
const baseURL = "http://localhost:56000";

const $host = axios.create({
    baseURL: baseURL
});

const $authHost = axios.create({
    baseURL: baseURL
});

const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (config.headers) {
        config.headers['authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
};

$host.interceptors.request.use(request => {
    return request;
});



$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
