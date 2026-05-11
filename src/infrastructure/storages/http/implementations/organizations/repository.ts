import type {
    TListResponse,
    TGeneralId,
    TApiResponse,
    TErrorResponse,
} from '@modules/common/types/operations';
import type {
    TOrganizationFDOM,
    OrganizationDOM,
} from '@modules/organizations/domain/entities/organization';
import type { TOrganizationRepository } from '@modules/organizations/domain/repositories/organization';
import { adapterDateToString, withAbortController } from '@storages/http/client/drivers';
import { handlerError } from '@storages/http/client/errors';
import { httpAuth } from '@storages/http/client/instances';
import { OrganizationAdapters } from './adapters';
import { ListResponse } from '@modules/common/dto/responses/list_responses';
import type { OrganizationAPI, TOrganizationFAPI } from './dtos';
import { ApiReponse } from '@modules/common/dto/responses/api_responses';
const PATH = '/organizations';
const adapters = new OrganizationAdapters();

export class OrganizationHttpRepo implements TOrganizationRepository {
    getAll = async (filters: TOrganizationFDOM): Promise<TListResponse<OrganizationDOM>> => {
        try {
            return await withAbortController(async (controller) => {
                const { data } = await httpAuth.get<ListResponse<OrganizationAPI>>(PATH, {
                    signal: controller.signal,
                    params: this.filtersDomToApi(filters),
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
    getById = async (id: TGeneralId): Promise<TApiResponse<OrganizationDOM>> => {
        try {
            return await withAbortController(async () => {
                return await withAbortController(async (controller) => {
                    const { data } = await httpAuth.get<ApiReponse<OrganizationAPI>>(
                        `${PATH}/${id}`,
                        {
                            signal: controller.signal,
                        },
                    );

                    return {
                        data: new ApiReponse(adapters.apiToDom(data.item), data.status),
                        error: null,
                    };
                });
            });
        } catch (error) {
            return handlerError(error);
        }
    };
    getOne = async (filters: TOrganizationFDOM): Promise<TApiResponse<OrganizationDOM>> => {
        try {
            return await withAbortController(async () => {
                return await withAbortController(async (controller) => {
                    const { data } = await httpAuth.get<ApiReponse<OrganizationAPI>>(PATH, {
                        signal: controller.signal,
                        params: this.filtersDomToApi(filters),
                    });

                    return {
                        data: new ApiReponse(adapters.apiToDom(data.item), data.status),
                        error: null,
                    };
                });
            });
        } catch (error) {
            return handlerError(error);
        }
    };
    create = async (item: OrganizationDOM): Promise<TApiResponse<OrganizationDOM>> => {
        try {
            return await withAbortController(async (controller) => {
                const { data } = await httpAuth.post<ApiReponse<OrganizationAPI>>(
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
    createMany = async (_: OrganizationDOM[]): Promise<TListResponse<OrganizationDOM>> => {
        try {
            throw new Error('This method is not implemented');
        } catch (error) {
            return handlerError(error);
        }
    };
    update = async (
        id: TGeneralId,
        item: OrganizationDOM,
    ): Promise<TApiResponse<OrganizationDOM>> => {
        try {
            return await withAbortController(async (controller) => {
                const { data } = await httpAuth.patch<ApiReponse<OrganizationAPI>>(
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

    updateMany = async (_: TOrganizationFDOM, __: OrganizationDOM): Promise<TErrorResponse> => {
        throw new Error('This method is not implemented');
    };
    delete = async (_: TGeneralId): Promise<TErrorResponse> => {
        throw new Error('This method is not implemented');
    };
    deleteMany = async (_: TOrganizationFDOM): Promise<TErrorResponse> => {
        throw new Error('This method is not implemented');
    };

    private filtersDomToApi = (filters: TOrganizationFDOM): TOrganizationFAPI => {
        return {
            _id: filters.id,
            name: filters.name,
            tenant_id: filters.tenantId,
            owner_user_id: filters.ownerUserId,
            created_at: adapterDateToString(filters.createdAt),
            updated_at: adapterDateToString(filters.updatedAt),
            deleted_at: adapterDateToString(filters.deletedAt),
        };
    };
}
