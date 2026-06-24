import type { TTenantDOM, TTenantFDOM } from '@modules/tenants/domain/entities/tenant';
import type { TTenantRepository } from '@modules/tenants/domain/repositories/tenant';
import { adapterDateToString, BaseAxiosHttpRepo } from '@storages/http/client/drivers';
import type { TTenantAPI, TTenantFAPI } from './dtos';
import { TenantAdapters } from './adapters';
import { httpV1 } from '@storages/http/client/instances';

export class TenantHttpRepo
    extends BaseAxiosHttpRepo<TTenantDOM, TTenantFDOM, TTenantAPI, TTenantFAPI>
    implements TTenantRepository
{
    protected adapters = new TenantAdapters();
    protected http = httpV1;
    protected filtersDomToApi = (filters: TTenantFDOM): TTenantFAPI => {
        return {
            _id: filters.id,
            name: filters.name,
            email: filters.email,
            phone: filters.phone,
            country_code: filters.countryCode,
            plan_id: filters.planId,
            owner_user_id: filters.ownerUserId,
            subscription_status_id: filters.subscriptionStatusId,
            next_payment_at: adapterDateToString(filters.nextPaymentAt),
            created_at: adapterDateToString(filters.createdAt),
            updated_at: adapterDateToString(filters.updatedAt),
            deleted_at: adapterDateToString(filters.deletedAt),
        };
    };
}
