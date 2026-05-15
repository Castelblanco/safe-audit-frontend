import type { TFilterBy } from '@common/types/operations';

export type TSubscriptionStatusDOM = {
    id: number;
    name: string;
    createdAt: Date;
    deletedAt: Date | null;
};

export class SubscriptionStatusDOM implements TSubscriptionStatusDOM {
    id: number;
    name: string;
    createdAt: Date;
    deletedAt: Date | null;

    constructor(item: TSubscriptionStatusDOM) {
        this.id = item.id;
        this.name = item.name;
        this.createdAt = item.createdAt;
        this.deletedAt = item.deletedAt;
    }
}

export type TSubscriptionStatusFDOM = TFilterBy<TSubscriptionStatusDOM>;
