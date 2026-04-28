import type { TAuditFDOM, AuditDOM } from '@modules/audits/domain/entities/audit';
import type { TAuditRepository } from '@modules/audits/domain/repositories/audit';
import { ApiReponse } from '@modules/common/dto/responses/api_responses';
import { ListResponse } from '@modules/common/dto/responses/list_responses';
import type {
    TGeneralId,
    TErrorResponse,
    TListResponse,
    TApiResponse,
} from '@modules/common/types/operations';
import { httpV1 } from '@storages/http/client/instances';
import type { AuditAPI } from './dtos';
import { handlerError } from '@storages/http/client/errors';
import { AuditAdapters } from './adapters';
import { withAbortController } from '@storages/http/client/abort_controller';

const PATH = '/audits';
const adapters = new AuditAdapters();
export class AuditHttpRepo implements TAuditRepository {
    getAll = async (filters: TAuditFDOM): Promise<TListResponse<AuditDOM>> => {
        try {
            return await withAbortController(async (controller) => {
                const { data } = await httpV1.get<ListResponse<AuditAPI>>(PATH, {
                    signal: controller.signal,
                    params: filters,
                });
                return {
                    data: new ListResponse(
                        data.items.map(adapters.apiToDom),
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
    getById = async (id: TGeneralId): Promise<TApiResponse<AuditDOM>> => {
        try {
            return await withAbortController(async (controller) => {
                const { data } = await httpV1.get<ApiReponse<AuditAPI>>(`${PATH}/${id}`, {
                    signal: controller.signal,
                });

                return {
                    data: new ApiReponse(adapters.apiToDom(data.item), data.status),
                    error: null,
                };
            });
        } catch (error) {
            return handlerError(error);
        }
    };
    getOne = async (_: TAuditFDOM): Promise<TApiResponse<AuditDOM>> => {
        throw new Error('This method is not implemented');
    };
    create = async (item: AuditDOM): Promise<TApiResponse<AuditDOM>> => {
        try {
            return await withAbortController(async (controller) => {
                const { data } = await httpV1.post<ApiReponse<AuditAPI>>(
                    PATH,
                    adapters.domToApi(item),
                    {
                        signal: controller.signal,
                    },
                );

                return {
                    data: new ApiReponse(adapters.apiToDom(data.item), data.status),
                    error: null,
                };
            });
        } catch (error) {
            return handlerError(error);
        }
    };
    createMany = async (_: AuditDOM[]): Promise<TListResponse<AuditDOM>> => {
        throw new Error('This method is not implemented');
    };
    update = async (id: TGeneralId, item: AuditDOM): Promise<TApiResponse<AuditDOM>> => {
        try {
            return await withAbortController(async (controller) => {
                const { data } = await httpV1.patch<ApiReponse<AuditAPI>>(
                    `${PATH}/${id}`,
                    adapters.domToApi(item),
                    {
                        signal: controller.signal,
                    },
                );

                return {
                    data: new ApiReponse(adapters.apiToDom(data.item), data.status),
                    error: null,
                };
            });
        } catch (error) {
            return handlerError(error);
        }
    };
    updateMany = async (_: TAuditFDOM, __: Partial<AuditDOM>): Promise<TErrorResponse> => {
        throw new Error('This method is not implemented');
    };
    delete = async (_: TGeneralId): Promise<TErrorResponse> => {
        throw new Error('This method is not implemented');
    };
    deleteMany = async (_: TAuditFDOM): Promise<TErrorResponse> => {
        throw new Error('This method is not implemented');
    };
}
