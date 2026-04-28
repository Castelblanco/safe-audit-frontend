import type { TReadOperations } from '@common/types/operations';
import type { AuditTypeDOM, TAuditTypeFDOM } from '../entities/audit_type';

export type TAuditTypeRepository = TReadOperations<AuditTypeDOM, TAuditTypeFDOM>;
