import type { TFilterBy } from '@common/types/operations';

export type TUserAPI = {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    role_id: number;
    status_id: number;
    tenant_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

export class UserAPI implements TUserAPI {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    role_id: number;
    status_id: number;
    tenant_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;

    constructor(item: TUserAPI) {
        this._id = item._id;
        this.first_name = item.first_name;
        this.last_name = item.last_name;
        this.email = item.email;
        this.role_id = item.role_id;
        this.status_id = item.status_id;
        this.tenant_id = item.tenant_id;
        this.created_at = item.created_at;
        this.updated_at = item.updated_at;
        this.deleted_at = item.deleted_at;
    }
}

export type TUserFAPI = TFilterBy<TUserAPI>;
