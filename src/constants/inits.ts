import type { AuditDOM } from '@modules/audits/domain/entities/audit';
import { STATUS_AUDIT } from './status';

export const AUDIT_INIT: AuditDOM = {
    id: '',
    organizationId: '',
    tenantId: '',
    title: '',
    description: '',
    statusId: STATUS_AUDIT.DRAFT,
    typeId: null,
    startDate: null,
    endDate: null,
    auditorUserId: '',
    createdBy: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
};
