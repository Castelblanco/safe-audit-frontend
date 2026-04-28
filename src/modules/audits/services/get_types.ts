import type { TAuditTypeFDOM } from '@modules/audits/domain/entities/audit_type';
import type { TAuditTypeRepository } from '@modules/audits/domain/repositories/audit_type';

type TDependencies = {
    auditTypeRepo: TAuditTypeRepository;
};

export const buildGetTypes = ({ auditTypeRepo }: TDependencies) => {
    const execute = async (filters: TAuditTypeFDOM) => {
        return await auditTypeRepo.getAll(filters);
    };
    return execute;
};
