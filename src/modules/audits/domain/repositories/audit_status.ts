import type { TReadOperations } from '@common/types/operations';
import type { AuditStatusDOM, TAuditStatusFDOM } from '../entities/audit_status';

export type TAuditStatusRepository = TReadOperations<AuditStatusDOM, TAuditStatusFDOM>;
