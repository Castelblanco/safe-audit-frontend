import type { TFilterBy } from '@common/types/operations';

export type TOrganizationAPI = {
    _id: string;
    name: string;
    tenant_id: string;
    owner_user_id: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
};

export class OrganizationAPI implements TOrganizationAPI {
    _id: string;
    name: string;
    tenant_id: string;
    owner_user_id: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;

    constructor(item: TOrganizationAPI) {
        this._id = item._id;
        this.name = item.name;
        this.tenant_id = item.tenant_id;
        this.owner_user_id = item.owner_user_id;
        this.created_at = item.created_at;
        this.updated_at = item.updated_at;
        this.deleted_at = item.deleted_at;
    }
}

export type TOrganizationFAPI = TFilterBy<TOrganizationAPI>;
