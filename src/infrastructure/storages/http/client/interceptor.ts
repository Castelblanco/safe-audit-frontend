import { useOrganizationsStore } from '@storages/stores/organizations';
import { useSessionStore } from '@storages/stores/session';
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const onResponseError = (err: AxiosError) => {
    if (err.status === 403) {
        const sessionStore = useSessionStore();
        sessionStore.clear();
    }
    return Promise.reject(err);
};

export const setInterceptorAuth = (instances: AxiosInstance[]) => {
    const sessionStore = useSessionStore();
    const onRequest = (req: InternalAxiosRequestConfig<unknown>) => {
        req.headers.Authorization = sessionStore.value?.accessToken;
        return req;
    };

    instances.forEach((http) => {
        http.interceptors.request.use(onRequest);
        http.interceptors.response.use(undefined, onResponseError);
    });
};

export const setInterceptor = (instances: AxiosInstance[]) => {
    const sessionStore = useSessionStore();
    const organizationStore = useOrganizationsStore();
    const onRequest = (req: InternalAxiosRequestConfig<unknown>) => {
        const org = organizationStore.get();
        req.params = {
            ...req.params,
            organization_id: org.id,
        };
        req.headers.Authorization = sessionStore.value?.accessToken;
        return req;
    };

    instances.forEach((http) => {
        http.interceptors.request.use(onRequest);
        http.interceptors.response.use(undefined, onResponseError);
    });
};
