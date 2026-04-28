import { ApiError } from '@modules/common/dto/errors/api_error';
import type { TResponse } from '@modules/common/types/operations';
import { isCancel, isAxiosError } from 'axios';

export const handlerError = <T>(error: unknown): TResponse<T> => {
    if (isCancel(error))
        return {
            data: null,
            error: undefined,
        };
    if (isAxiosError(error)) {
        const { data } = error.response || {};
        if (error.code === 'ERR_NETWORK') {
            return {
                data: null,
                error: new ApiError('Error Network', 0, 'network'),
            };
        }

        return {
            data: null,
            error: new ApiError(data.message, error.status || 1, data.code),
        };
    }
    return {
        data: null,
        error: new ApiError('Internal Server Error', 500, 'internal'),
    };
};
