import type { TAdapter } from '@modules/common/types/adapters';
import { UserDOM } from '@modules/users/domain/entities/user';
import { UserAPI } from './dtos';

export class UserAdapters implements TAdapter<UserDOM, UserAPI> {
    domToApi = (item: UserDOM): UserAPI => {
        return new UserAPI({
            _id: item.id,
            first_name: item.firstName,
            last_name: item.lastName,
            email: item.email,
            role_id: item.roleId,
            status_id: item.statusId,
            tenant_id: item.tenantId,
            organization_id: item.organizationId,
            created_at: item.createdAt?.toISOString(),
            updated_at: item.updatedAt?.toISOString(),
            deleted_at: item.deletedAt?.toISOString() || null,
        });
    };
    apiToDom = (item: UserAPI): UserDOM => {
        return new UserDOM({
            id: item._id,
            firstName: item.first_name,
            lastName: item.last_name,
            email: item.email,
            roleId: item.role_id,
            statusId: item.status_id,
            tenantId: item.tenant_id,
            organizationId: item.organization_id,
            createdAt: item.created_at ? new Date(item.created_at) : new Date(),
            updatedAt: item.updated_at ? new Date(item.updated_at) : new Date(),
            deletedAt: null,
        });
    };
}
