import type { TFilterBy } from '@common/types/operations';

export type TUserStatusDOM = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export class UserStatusDOM implements TUserStatusDOM {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(item: TUserStatusDOM) {
        this.id = item.id;
        this.name = item.name;
        this.createdAt = item.createdAt;
        this.updatedAt = item.updatedAt;
        this.deletedAt = item.deletedAt;
    }
}

export type TUserStatusFDOM = TFilterBy<TUserStatusDOM>;
