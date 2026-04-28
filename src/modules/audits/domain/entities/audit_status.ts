import type { TFilterBy } from '@common/types/operations';

export type TAuditStatusDOM = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export class AuditStatusDOM implements TAuditStatusDOM {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(item: TAuditStatusDOM) {
        this.id = item.id;
        this.name = item.name;
        this.createdAt = item.createdAt;
        this.updatedAt = item.updatedAt;
        this.deletedAt = item.deletedAt;
    }
}

export type TAuditStatusFDOM = TFilterBy<TAuditStatusDOM>;
