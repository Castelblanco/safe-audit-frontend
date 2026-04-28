import { AuditStatusDOM } from '@modules/audits/domain/entities/audit_status';
import type { TAdapter } from '@modules/common/types/adapters';
import { AuditStatusAPI } from './dtos';

export class AuditStatusAdapters implements TAdapter<AuditStatusDOM, AuditStatusAPI> {
    domToApi = (item: AuditStatusDOM): AuditStatusAPI => {
        return new AuditStatusAPI({
            _id: item.id,
            name: item.name,
            created_at: item.createdAt.toISOString(),
            updated_at: item.updatedAt.toISOString(),
            deleted_at: item.deletedAt?.toISOString() || null,
        });
    };
    apiToDom = (item: AuditStatusAPI): AuditStatusDOM => {
        return new AuditStatusDOM({
            id: item._id,
            name: item.name,
            createdAt: new Date(item.created_at),
            updatedAt: new Date(item.updated_at),
            deletedAt: null,
        });
    };
}
