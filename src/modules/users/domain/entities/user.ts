import type { TFilterBy } from '@common/types/operations';

export type TUserDOM = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
    statusId: number;
    tenantId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export class UserDOM implements TUserDOM {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
    statusId: number;
    tenantId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(item: TUserDOM) {
        this.id = item.id;
        this.firstName = item.firstName;
        this.lastName = item.lastName;
        this.email = item.email;
        this.roleId = item.roleId;
        this.statusId = item.statusId;
        this.tenantId = item.tenantId;
        this.createdAt = item.createdAt;
        this.updatedAt = item.updatedAt;
        this.deletedAt = item.deletedAt;
    }
}

export type TUserFDOM = TFilterBy<TUserDOM>;
