import type { TenantDOM } from '@modules/tenants/domain/entities/tenant';
import type { TTenantRepository } from '@modules/tenants/domain/repositories/tenant';

type TDependencies = {
    tenantRepo: TTenantRepository;
};

export const buildUpdate = ({ tenantRepo }: TDependencies) => {
    const execute = async (id: TenantDOM['id'], tenant: Partial<TenantDOM>) => {
        return await tenantRepo.update(id, tenant);
    };
    return execute;
};
