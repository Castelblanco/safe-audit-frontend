import type {
    TAllOperations,
    TFilterBy,
    TFilterOperator,
    TFilterValueDate,
    TFilterValueString,
} from '@modules/common/types/operations';
import { abortManager } from '@storages/stores/abort_controllers';
import { datetimeTool } from '@tools/datetime';
import type {
    TListResponse,
    TGeneralId,
    TApiResponse,
    TErrorResponse,
} from '@modules/common/types/operations';
import { ListResponse } from '@modules/common/dto/responses/list_responses';
import { ApiReponse } from '@modules/common/dto/responses/api_responses';
import type { TAdapter } from '@modules/common/types/adapters';
import type { AxiosInstance } from 'axios';
import { handlerError } from './errors';

// Abort controller handler
export const withAbortController = <T>(
    request: (controller: AbortController) => Promise<T>,
): Promise<T> => {
    const controller = new AbortController();
    const index = abortManager.add(controller);
    return request(controller).finally(() => {
        abortManager.remove(index);
    });
};

// Adapters
export const adapterDateToString = (filters?: TFilterValueDate): TFilterValueString | undefined => {
    if (!filters) return;
    if (filters instanceof Date) return String(datetimeTool.toMillis(filters));

    const filterAPI: TFilterValueString = {};
    for (const [key, value] of Object.entries(filters) as [keyof TFilterOperator<Date>, Date][]) {
        filterAPI[key] = String(datetimeTool.toMillis(value));
    }
    return filterAPI;
};

// Clients
export abstract class BaseAxiosHttpRepo<TDOM, TFDOM extends TFilterBy<TDOM>, TAPI, TFAPI>
    implements TAllOperations<TDOM, TFDOM>
{
    protected abstract adapters: TAdapter<TDOM, TAPI>;
    protected abstract http: AxiosInstance;
    protected abstract filtersDomToApi: (filters: TFDOM) => TFAPI;
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    getAll = async (filters: TFDOM): Promise<TListResponse<TDOM>> => {
        try {
            return await withAbortController(async (controller) => {
                const { data } = await this.http.get<ListResponse<TAPI>>(this.path, {
                    signal: controller.signal,
                    params: {
                        ...this.filtersDomToApi(filters),
                        limit: filters.limit,
                        offset: filters.offset,
                    },
                });
                return {
                    data: new ListResponse(
                        data.items.map(this.adapters.apiToDom),
                        data.total,
                        data.status,
                    ),
                    error: null,
                };
            });
        } catch (error) {
            return handlerError(error);
        }
    };
    getById = async (id: TGeneralId): Promise<TApiResponse<TDOM>> => {
        try {
            return await withAbortController(async () => {
                return await withAbortController(async (controller) => {
                    const { data } = await this.http.get<ApiReponse<TAPI>>(`${this.path}/${id}`, {
                        signal: controller.signal,
                    });

                    return {
                        data: new ApiReponse(this.adapters.apiToDom(data.item), data.status),
                        error: null,
                    };
                });
            });
        } catch (error) {
            return handlerError(error);
        }
    };
    getOne = async (filters: TFDOM): Promise<TApiResponse<TDOM>> => {
        try {
            return await withAbortController(async () => {
                return await withAbortController(async (controller) => {
                    const { data } = await this.http.get<ApiReponse<TAPI>>(this.path, {
                        signal: controller.signal,
                        params: {
                            ...this.filtersDomToApi(filters),
                            limit: filters.limit,
                            offset: filters.offset,
                        },
                    });

                    return {
                        data: new ApiReponse(this.adapters.apiToDom(data.item), data.status),
                        error: null,
                    };
                });
            });
        } catch (error) {
            return handlerError(error);
        }
    };
    create = async (item: TDOM): Promise<TApiResponse<TDOM>> => {
        try {
            return await withAbortController(async (controller) => {
                const { data } = await this.http.post<ApiReponse<TAPI>>(
                    this.path,
                    this.adapters.domToApi(item),
                    {
                        signal: controller.signal,
                    },
                );

                return {
                    data: new ApiReponse(this.adapters.apiToDom(data.item), data.status),
                    error: null,
                };
            });
        } catch (error) {
            return handlerError(error);
        }
    };
    createMany = async (_: TDOM[]): Promise<TListResponse<TDOM>> => {
        try {
            throw new Error('This method is not implemented');
        } catch (error) {
            return handlerError(error);
        }
    };
    update = async (id: TGeneralId, item: TDOM): Promise<TApiResponse<TDOM>> => {
        try {
            return await withAbortController(async (controller) => {
                const { data } = await this.http.patch<ApiReponse<TAPI>>(
                    `${this.path}/${id}`,
                    this.adapters.domToApi(item),
                    {
                        signal: controller.signal,
                    },
                );

                return {
                    data: new ApiReponse(this.adapters.apiToDom(data.item), data.status),
                    error: null,
                };
            });
        } catch (error) {
            return handlerError(error);
        }
    };

    updateMany = async (_: TFDOM, __: TDOM): Promise<TErrorResponse> => {
        throw new Error('This method is not implemented');
    };
    delete = async (_: TGeneralId): Promise<TErrorResponse> => {
        throw new Error('This method is not implemented');
    };
    deleteMany = async (_: TFDOM): Promise<TErrorResponse> => {
        throw new Error('This method is not implemented');
    };
}
