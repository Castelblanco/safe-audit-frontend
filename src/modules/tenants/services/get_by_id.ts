import type { TenantDOM } from '@modules/tenants/domain/entities/tenant';
import type { TTenantRepository } from '@modules/tenants/domain/repositories/tenant';

type TDependencies = {
    tenantRepo: TTenantRepository;
};

export const buildGetById = ({ tenantRepo }: TDependencies) => {
    const execute = async (id: TenantDOM['id']) => {
        return await tenantRepo.getById(id);
    };
    return execute;
};
