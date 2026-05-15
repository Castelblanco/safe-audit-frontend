import type { TRoleFDOM } from '@modules/users/domain/entities/role';
import type { TRoleRepository } from '@modules/users/domain/repositories/role';

type TDependencies = {
    roleRepo: TRoleRepository;
};

export const buildGetRoles = ({ roleRepo }: TDependencies) => {
    const execute = async (filters: TRoleFDOM) => {
        return await roleRepo.getAll(filters);
    };
    return execute;
};
