import type { TRoleDOM, TRoleFDOM } from '@modules/users/domain/entities/role';
import type { TRoleRepository } from '@modules/users/domain/repositories/role';
import { adapterDateToString, BaseAxiosHttpRepo } from '@storages/http/client/drivers';
import type { TRoleAPI, TRoleFAPI } from './dtos';
import { RoleAdapters } from './adapters';
import { httpV1 } from '@storages/http/client/instances';

export class RoleHttpRepo
    extends BaseAxiosHttpRepo<TRoleDOM, TRoleFDOM, TRoleAPI, TRoleFAPI>
    implements TRoleRepository
{
    protected adapters = new RoleAdapters();
    protected http = httpV1;
    protected filtersDomToApi = (filters: TRoleFDOM): TRoleFAPI => {
        return {
            _id: filters.id,
            name: filters.name,
            created_at: adapterDateToString(filters.createdAt),
            updated_at: adapterDateToString(filters.updatedAt),
            deleted_at: adapterDateToString(filters.deletedAt),
        };
    };
}
