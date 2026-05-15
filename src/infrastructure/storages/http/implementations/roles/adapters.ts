import { RoleAPI } from './dtos';
import { RoleDOM } from '@modules/users/domain/entities/role';
import type { TAdapter } from '@modules/common/types/adapters';

export class RoleAdapters implements TAdapter<RoleDOM, RoleAPI> {
    domToApi = (item: RoleDOM): RoleAPI => {
        return new RoleAPI({
            _id: item.id,
            name: item.name,
            created_at: item.createdAt.toISOString(),
            updated_at: item.updatedAt.toISOString(),
            deleted_at: item.deletedAt?.toISOString() || null,
        });
    };
    apiToDom = (item: RoleAPI): RoleDOM => {
        return new RoleDOM({
            id: item?._id as number,
            name: item.name,
            createdAt: item.created_at ? new Date(item.created_at) : new Date(),
            updatedAt: item.updated_at ? new Date(item.updated_at) : new Date(),
            deletedAt: item.updated_at ? new Date(item.updated_at) : null,
        });
    };
    partialDomToApi = (item: Partial<RoleDOM>): Partial<RoleAPI> => {
        return {
            _id: item.id,
            name: item.name,
            created_at: item.createdAt?.toISOString(),
            updated_at: item.updatedAt?.toISOString(),
            deleted_at: item.deletedAt?.toISOString() || null,
        };
    };
}
