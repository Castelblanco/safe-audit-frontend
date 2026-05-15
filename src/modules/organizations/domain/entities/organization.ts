import type { TFilterBy } from '@common/types/operations';

export type TOrganizationDOM = {
    id: string;
    name: string;
    tenantId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export class OrganizationDOM implements TOrganizationDOM {
    id: string;
    name: string;
    tenantId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(item: TOrganizationDOM) {
        this.id = item.id;
        this.name = item.name;
        this.tenantId = item.tenantId;
        this.createdAt = item.createdAt;
        this.updatedAt = item.updatedAt;
        this.deletedAt = item.deletedAt;
    }
}

export type TOrganizationFDOM = TFilterBy<TOrganizationDOM>;
