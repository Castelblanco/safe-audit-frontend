import { useSessionStore } from '@storages/stores/session';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export const setInterceptor = (instances: AxiosInstance[]) => {
    const sessionStore = useSessionStore();
    const onRequest = (request: InternalAxiosRequestConfig<unknown>) => {
        try {
            request.headers.Authorization = sessionStore.value?.accessToken;
            return request;
        } catch {
            return request;
        }
    };

    instances.forEach((http) => {
        http.interceptors.request.use(onRequest);
    });
};
