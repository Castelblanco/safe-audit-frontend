import type { TAllOperations } from '@modules/common/types/operations';
import type { AuditDOM, TAuditFDOM } from '../entities/audit';

export type TAuditRepository = TAllOperations<AuditDOM, TAuditFDOM>;
