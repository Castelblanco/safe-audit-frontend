import type { TFilterBy } from '@common/types/operations';

export type TTenantDOM = {
    id: string;
    name: string;
    planId: number;
    subscriptionStatusId: number;
    nextPaymentAt: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export class TenantDOM implements TTenantDOM {
    id: string;
    name: string;
    planId: number;
    subscriptionStatusId: number;
    nextPaymentAt: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(item: TTenantDOM) {
        this.id = item.id;
        this.name = item.name;
        this.planId = item.planId;
        this.subscriptionStatusId = item.subscriptionStatusId;
        this.nextPaymentAt = item.nextPaymentAt;
        this.createdAt = item.createdAt;
        this.updatedAt = item.updatedAt;
        this.deletedAt = item.deletedAt;
    }
}

export type TTenantFDOM = TFilterBy<TTenantDOM>;
