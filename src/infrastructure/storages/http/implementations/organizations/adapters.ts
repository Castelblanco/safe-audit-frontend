import type { TAdapter } from '@common/types/adapters';
import { OrganizationAPI } from './dtos';
import { OrganizationDOM } from '@modules/organizations/domain/entities/organization';

export class OrganizationAdapters implements TAdapter<OrganizationDOM, OrganizationAPI> {
    domToApi = (item: OrganizationDOM): OrganizationAPI => {
        return new OrganizationAPI({
            _id: item.id,
            name: item.name,
            tenant_id: item.tenantId,
            created_at: item.createdAt.toISOString(),
            updated_at: item.updatedAt.toISOString(),
            deleted_at: item.deletedAt?.toISOString(),
        });
    };
    partialDomToApi = (item: Partial<OrganizationDOM>): Partial<OrganizationAPI> => {
        return {
            _id: item.id,
            name: item.name,
            tenant_id: item.tenantId,
            created_at: item.createdAt?.toISOString(),
            updated_at: item.updatedAt?.toISOString(),
            deleted_at: item.deletedAt?.toISOString(),
        };
    };
    apiToDom = (item: OrganizationAPI): OrganizationDOM => {
        return new OrganizationDOM({
            id: item._id,
            name: item.name,
            tenantId: item.tenant_id,
            createdAt: new Date(item.created_at),
            updatedAt: new Date(item.updated_at),
            deletedAt: null,
        });
    };
}
