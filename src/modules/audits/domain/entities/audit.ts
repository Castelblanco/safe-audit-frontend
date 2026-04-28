import type { TFilterBy } from '@modules/common/types/operations';

export type TAuditDOM = {
    id: string;
    organizationId: string;
    tenantId: string;
    title: string;
    description: string | null;
    statusId: number;
    typeId: number | null;
    startDate: Date | null;
    endDate: Date | null;
    auditorUserId: string | null;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export class AuditDOM implements TAuditDOM {
    id: string;
    organizationId: string;
    tenantId: string;
    title: string;
    description: string | null;
    statusId: number;
    typeId: number | null;
    startDate: Date | null;
    endDate: Date | null;
    auditorUserId: string | null;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(item: TAuditDOM) {
        this.id = item.id;
        this.organizationId = item.organizationId;
        this.tenantId = item.tenantId;
        this.title = item.title;
        this.description = item.description;
        this.statusId = item.statusId;
        this.typeId = item.typeId;
        this.startDate = item.startDate;
        this.endDate = item.endDate;
        this.auditorUserId = item.auditorUserId;
        this.createdBy = item.createdBy;
        this.createdAt = item.createdAt;
        this.updatedAt = item.updatedAt;
        this.deletedAt = item.deletedAt;
    }
}

export type TAuditFDOM = TFilterBy<TAuditDOM>;
