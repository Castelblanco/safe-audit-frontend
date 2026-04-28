import { AuditTypeDOM } from '@modules/audits/domain/entities/audit_type';
import type { TAdapter } from '@modules/common/types/adapters';
import { AuditTypeAPI } from './dtos';

export class AuditTypeAdapters implements TAdapter<AuditTypeDOM, AuditTypeAPI> {
    domToApi = (item: AuditTypeDOM): AuditTypeAPI => {
        return new AuditTypeAPI({
            _id: item.id,
            name: item.name,
            created_at: item.createdAt.toISOString(),
            updated_at: item.updatedAt.toISOString(),
            deleted_at: item.deletedAt?.toISOString() || null,
        });
    };
    apiToDom = (item: AuditTypeAPI): AuditTypeDOM => {
        return new AuditTypeDOM({
            id: item._id,
            name: item.name,
            createdAt: new Date(item.created_at),
            updatedAt: new Date(item.updated_at),
            deletedAt: null,
        });
    };
}
