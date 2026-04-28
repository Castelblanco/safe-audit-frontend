import type { ListResponse } from '@common/dto/responses/list_responses';
import type { ApiReponse } from '@common/dto/responses/api_responses';
import type { ApiError } from '../dto/errors/api_error';

// Types values
export type TGeneralId = number | string | bigint;
export type TOrderByValues = 'asc' | 'desc';
export type TPagination<T> = {
    limit?: number;
    offset?: number;
    orderBy?: {
        [K in keyof T]?: TOrderByValues;
    };
};

// Exclude value dafult and retunt opject operations
export type TFilterOperator<T> = Exclude<TFilterValue<T>, T>;
// Filters operators by bigint
export type TFilterValueBigint<T = bigint> =
    | T
    | { eq?: T; ne?: T; lt?: T; lte?: T; gt?: T; gte?: T; in?: T[] };
// Filters operators by number
export type TFilterValueNumber<T = number> =
    | T
    | { eq?: T; ne?: T; lt?: T; lte?: T; gt?: T; gte?: T; in?: T[] };
// Filters operators by string
export type TFilterValueString<T = string> =
    | T
    | {
          eq?: T;
          ne?: T;
          contains?: T;
          startsWith?: T;
          endsWith?: T;
          in?: T[];
          lt?: T;
          lte?: T;
          gt?: T;
          gte?: T;
      };
// Filters operators by Date
export type TFilterValueDate<T = Date> = T | { eq?: T; lt?: T; lte?: T; gt?: T; gte?: T };

export type TFilterValue<T> = T extends number
    ? TFilterValueNumber<T>
    : T extends bigint
      ? TFilterValueBigint<T>
      : T extends Date
        ? TFilterValueDate<Date>
        : T extends string
          ? TFilterValueString<T>
          : T extends boolean
            ? T
            : never;

// Create type filters by interface or custom type
export type TFilterBy<T> = TPagination<T> & {
    [k in keyof T]?: TFilterValue<T[k]>;
};

export type TResponse<T> =
    | { data: T; error: null }
    | { data: null; error: undefined }
    | { data: null; error: ApiError };
export type TErrorResponse = ApiError | null | undefined;
export type TListResponse<T> = TResponse<ListResponse<T>>;
export type TApiResponse<T> = TResponse<ApiReponse<T>>;

// Types Operations
export type TReadOperations<T, TFilter> = {
    getAll: (filters: TFilter) => Promise<TListResponse<T>>;
    getById: (id: TGeneralId) => Promise<TApiResponse<T>>;
    getOne: (filters: TFilter) => Promise<TApiResponse<T>>;
};

export type TWriteOperations<T, TFilter> = {
    create: (item: T) => Promise<TApiResponse<T>>;
    createMany: (item: T[]) => Promise<TListResponse<T>>;
    update: (id: TGeneralId, item: T) => Promise<TApiResponse<T>>;
    updateMany: (filters: TFilter, item: T) => Promise<TErrorResponse>;
    delete: (id: TGeneralId) => Promise<TErrorResponse>;
    deleteMany: (filters: TFilter) => Promise<TErrorResponse>;
};

export type TAllOperations<T, TFilter> = TReadOperations<T, TFilter> & TWriteOperations<T, TFilter>;
