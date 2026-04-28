import type { TFilterBy } from '@common/types/operations';

export type TAuditAPI = {
    _id: string;
    organization_id: string;
    tenant_id: string;
    title: string;
    description: string | null;
    status_id: number;
    type_id: number | null;
    start_date: string | null;
    end_date: string | null;
    auditor_user_id: string | null;
    created_by: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

export class AuditAPI implements TAuditAPI {
    _id: string;
    organization_id: string;
    tenant_id: string;
    title: string;
    description: string | null;
    status_id: number;
    type_id: number | null;
    start_date: string | null;
    end_date: string | null;
    auditor_user_id: string | null;
    created_by: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;

    constructor(item: TAuditAPI) {
        this._id = item._id;
        this.organization_id = item.organization_id;
        this.tenant_id = item.tenant_id;
        this.title = item.title;
        this.description = item.description;
        this.status_id = item.status_id;
        this.type_id = item.type_id;
        this.start_date = item.start_date;
        this.end_date = item.end_date;
        this.auditor_user_id = item.auditor_user_id;
        this.created_by = item.created_by;
        this.created_at = item.created_at;
        this.updated_at = item.updated_at;
        this.deleted_at = item.deleted_at;
    }
}

export type TAuditFAPI = TFilterBy<TAuditAPI>;
