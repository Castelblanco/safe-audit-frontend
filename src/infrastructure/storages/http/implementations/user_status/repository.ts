import type { TUserStatusDOM, TUserStatusFDOM } from '@modules/users/domain/entities/user_status';
import type { TUserStatusRepository } from '@modules/users/domain/repositories/user_status';
import { adapterDateToString, BaseAxiosHttpRepo } from '@storages/http/client/drivers';
import type { TUserStatusAPI, TUserStatusFAPI } from './dtos';
import { UserStatusAdapters } from './adapters';
import { httpV1 } from '@storages/http/client/instances';

export class UserStatusHttpRepo
    extends BaseAxiosHttpRepo<TUserStatusDOM, TUserStatusFDOM, TUserStatusAPI, TUserStatusFAPI>
    implements TUserStatusRepository
{
    protected adapters = new UserStatusAdapters();
    protected http = httpV1;

    protected filtersDomToApi = (filters: TUserStatusFDOM): TUserStatusFAPI => {
        return {
            _id: filters.id,
            name: filters.name,
            created_at: adapterDateToString(filters.createdAt),
            updated_at: adapterDateToString(filters.updatedAt),
            deleted_at: adapterDateToString(filters.deletedAt),
        };
    };
}
