import { AuditDOM } from '@modules/audits/domain/entities/audit';
import type { TAdapter } from '@modules/common/types/adapters';
import { AuditAPI } from './dtos';

export class AuditAdapters implements TAdapter<AuditDOM, AuditAPI> {
    domToApi = (item: AuditDOM): AuditAPI => {
        return new AuditAPI({
            _id: item.id,
            organization_id: item.organizationId,
            tenant_id: item.tenantId,
            title: item.title,
            description: item.description,
            status_id: item.statusId,
            type_id: item.typeId,
            start_date: item.startDate?.toISOString() || null,
            end_date: item.endDate?.toISOString() || null,
            auditor_user_id: item.auditorUserId,
            created_by: item.createdBy,
            created_at: item.createdAt.toISOString(),
            updated_at: item.updatedAt.toISOString(),
            deleted_at: item.deletedAt?.toISOString() || null,
        });
    };
    apiToDom = (item: AuditAPI): AuditDOM => {
        return new AuditDOM({
            id: item._id,
            organizationId: item.organization_id,
            tenantId: item.tenant_id,
            title: item.title,
            description: item.description,
            statusId: item.status_id,
            typeId: item.type_id,
            startDate: item.start_date ? new Date(item.start_date) : null,
            endDate: item.end_date ? new Date(item.end_date) : null,
            auditorUserId: item.auditor_user_id,
            createdBy: item.created_by,
            createdAt: new Date(item.created_at),
            updatedAt: new Date(item.updated_at),
            deletedAt: null,
        });
    };
}
