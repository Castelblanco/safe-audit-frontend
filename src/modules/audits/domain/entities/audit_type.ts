import type { TFilterBy } from '@common/types/operations';

export type TAuditTypeDOM = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export class AuditTypeDOM implements TAuditTypeDOM {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(item: TAuditTypeDOM) {
        this.id = item.id;
        this.name = item.name;
        this.createdAt = item.createdAt;
        this.updatedAt = item.updatedAt;
        this.deletedAt = item.deletedAt;
    }
}

export type TAuditTypeFDOM = TFilterBy<TAuditTypeDOM>;
