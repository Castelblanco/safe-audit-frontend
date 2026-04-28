import type { TAuditStatusFDOM } from '@modules/audits/domain/entities/audit_status';
import type { TAuditStatusRepository } from '@modules/audits/domain/repositories/audit_status';

type TDependencies = {
    auditStatusRepo: TAuditStatusRepository;
};

export const buildGetStatuses = ({ auditStatusRepo }: TDependencies) => {
    const execute = async (filters: TAuditStatusFDOM) => {
        return await auditStatusRepo.getAll(filters);
    };
    return execute;
};
