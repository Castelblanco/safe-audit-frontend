import axios from 'axios';
import qs from 'qs';

export const httpV1 = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/v1`,
    paramsSerializer: (params) =>
        qs.stringify(params, {
            arrayFormat: 'comma',
        }),
});
