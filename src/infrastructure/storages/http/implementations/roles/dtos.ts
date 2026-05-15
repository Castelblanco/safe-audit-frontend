import type { TFilterBy } from '@common/types/operations';

export type TRoleAPI = {
    _id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
};

export class RoleAPI implements TRoleAPI {
    _id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;

    constructor(item: TRoleAPI) {
        this._id = item._id;
        this.name = item.name;
        this.created_at = item.created_at;
        this.updated_at = item.updated_at;
        this.deleted_at = item.deleted_at;
    }
}

export type TRoleFAPI = TFilterBy<TRoleAPI>;
