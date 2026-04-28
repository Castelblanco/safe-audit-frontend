import type { ApiError } from '@modules/common/dto/errors/api_error';
import type { TResponse } from '@modules/common/types/operations';

type TOptions<T> = {
    success: (data: T) => void;
    error: (error: ApiError) => void;
    cancel?: () => void;
};

export const handleResponse = <T>(result: TResponse<T>, options: TOptions<T>) => {
    if (result.error === undefined) return options.cancel?.();
    if (result.error !== null) return options.error(result.error);
    options.success(result.data);
};
