import type { AuditDOM } from '@modules/audits/domain/entities/audit';
import type { TAuditRepository } from '@modules/audits/domain/repositories/audit';

type TDependencies = {
    auditRepo: TAuditRepository;
};

export const buildGetById = ({ auditRepo }: TDependencies) => {
    const execute = async (id: AuditDOM['id']) => {
        return await auditRepo.getById(id);
    };
    return execute;
};
