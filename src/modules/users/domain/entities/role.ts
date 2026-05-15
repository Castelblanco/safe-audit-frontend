import type { TFilterBy } from '@common/types/operations';

export type TRoleDOM = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export class RoleDOM implements TRoleDOM {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(item: TRoleDOM) {
        this.id = item.id;
        this.name = item.name;
        this.createdAt = item.createdAt;
        this.updatedAt = item.updatedAt;
        this.deletedAt = item.deletedAt;
    }
}

export type TRoleFDOM = TFilterBy<TRoleDOM>;
