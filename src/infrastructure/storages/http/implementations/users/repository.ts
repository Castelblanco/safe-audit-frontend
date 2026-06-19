import type { TApiResponse } from '@modules/common/types/operations';
import type { TUserDOM, TUserFDOM } from '@modules/users/domain/entities/user';
import type { TUpdateOrganizations, TUserRepository } from '@modules/users/domain/repositories/user';
import { adapterDateToString, BaseAxiosHttpRepo, withAbortController } from '@storages/http/client/drivers';
import { handlerError } from '@storages/http/client/errors';
import type { TUserAPI, TUserFAPI } from './dtos';
import { UserAdapters } from './adapters';
import { httpV1 } from '@storages/http/client/instances';
import { ApiReponse } from '@modules/common/dto/responses/api_responses';

export class UserHttpRepo
    extends BaseAxiosHttpRepo<TUserDOM, TUserFDOM, TUserAPI, TUserFAPI>
    implements TUserRepository
{
    protected adapters = new UserAdapters();
    protected http = httpV1;
    protected filtersDomToApi = (filters: TUserFDOM): TUserFAPI => {
        return {
            _id: filters.id,
            first_name: filters.firstName,
            last_name: filters.lastName,
            email: filters.email,
            role_id: filters.roleId,
            status_id: filters.statusId,
            tenant_id: filters.tenantId,
            created_at: adapterDateToString(filters.createdAt),
            updated_at: adapterDateToString(filters.updatedAt),
            deleted_at: adapterDateToString(filters.deletedAt),
        };
    };

    updateOrganizations = async (
        id: TUserDOM['id'],
        data: TUpdateOrganizations,
    ): Promise<TApiResponse<unknown>> => {
        try {
            return await withAbortController(async (controller) => {
                const { data: response } = await this.http.patch<ApiReponse<unknown>>(
                    `/users/${id}/organizations`,
                    data,
                    { signal: controller.signal },
                );

                return {
                    data: new ApiReponse(response.item, response.status),
                    error: null,
                };
            });
        } catch (error) {
            return handlerError(error);
        }
    };
}
