import type { TFilterBy } from '@common/types/operations';

export type TTenantAPI = {
    _id: string;
    name: string;
    plan_id: number;
    subscription_status_id: number;
    next_payment_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

export class TenantAPI implements TTenantAPI {
    _id: string;
    name: string;
    plan_id: number;
    subscription_status_id: number;
    next_payment_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;

    constructor(item: TTenantAPI) {
        this._id = item._id;
        this.name = item.name;
        this.plan_id = item.plan_id;
        this.subscription_status_id = item.subscription_status_id;
        this.next_payment_at = item.next_payment_at;
        this.created_at = item.created_at;
        this.updated_at = item.updated_at;
        this.deleted_at = item.deleted_at;
    }
}

export type TTenantFAPI = TFilterBy<TTenantAPI>;
