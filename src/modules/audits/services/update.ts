import type { AuditDOM } from '@modules/audits/domain/entities/audit';
import type { TAuditRepository } from '@modules/audits/domain/repositories/audit';

type TDependencies = {
    auditRepo: TAuditRepository;
};

export const buildUpdate = ({ auditRepo }: TDependencies) => {
    const execute = async (id: AuditDOM['id'], audit: AuditDOM) => {
        return await auditRepo.update(id, audit);
    };
    return execute;
};
