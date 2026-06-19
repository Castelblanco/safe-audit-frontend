import { buildGetById } from '@modules/tenants/services';
import { TenantHttpRepo } from '@storages/http/implementations/tenants/repository';

const tenantRepo = new TenantHttpRepo('/tenants');

export const servicesTenants = {
    getById: buildGetById({ tenantRepo }),
};
