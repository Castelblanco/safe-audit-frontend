import type { TAuditFDOM } from '@modules/audits/domain/entities/audit';
import type { TAuditRepository } from '@modules/audits/domain/repositories/audit';

type TDependencies = {
    auditRepo: TAuditRepository;
};

export const buildGetAll = ({ auditRepo }: TDependencies) => {
    const execute = async (filters: TAuditFDOM) => {
        return await auditRepo.getAll(filters);
    };
    return execute;
};
