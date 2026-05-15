import { TenantAPI } from './dtos';
import { TenantDOM } from '@modules/tenants/domain/entities/tenant';
import type { TAdapter } from '@modules/common/types/adapters';

export class TenantAdapters implements TAdapter<TenantDOM, TenantAPI> {
    domToApi = (item: TenantDOM): TenantAPI => {
        return new TenantAPI({
            _id: item.id,
            name: item.name,
            plan_id: item.planId,
            owner_user_id: item.ownerUserId,
            subscription_status_id: item.subscriptionStatusId,
            next_payment_at: item.nextPaymentAt.toISOString(),
            created_at: item.createdAt.toISOString(),
            updated_at: item.updatedAt.toISOString(),
            deleted_at: item.deletedAt?.toISOString() || null,
        });
    };
    partialDomToApi = (item: Partial<TenantDOM>): Partial<TenantAPI> => {
        return {
            _id: item.id,
            name: item.name,
            plan_id: item.planId,
            owner_user_id: item.ownerUserId,
            subscription_status_id: item.subscriptionStatusId,
            next_payment_at: item.nextPaymentAt?.toISOString(),
            created_at: item.createdAt?.toISOString(),
            updated_at: item.updatedAt?.toISOString(),
            deleted_at: item.deletedAt?.toISOString() || null,
        };
    };

    apiToDom = (item: TenantAPI): TenantDOM => {
        return new TenantDOM({
            id: item._id,
            name: item.name,
            planId: item.plan_id,
            ownerUserId: item.owner_user_id,
            subscriptionStatusId: item.subscription_status_id,
            nextPaymentAt: new Date(item.next_payment_at),
            createdAt: new Date(item.created_at),
            updatedAt: new Date(item.updated_at),
            deletedAt: null,
        });
    };
}
