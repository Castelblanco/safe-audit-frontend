import type { AuditDOM } from '@modules/audits/domain/entities/audit';
import type { TAuditRepository } from '@modules/audits/domain/repositories/audit';

type TDependencies = {
    auditRepo: TAuditRepository;
};

export const buildCreate = ({ auditRepo }: TDependencies) => {
    const execute = async (audit: AuditDOM) => {
        return await auditRepo.create(audit);
    };
    return execute;
};
