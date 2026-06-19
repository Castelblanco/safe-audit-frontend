import type { UserDOM } from '@modules/users/domain/entities/user';
import type { TUpdateOrganizations, TUserRepository } from '@modules/users/domain/repositories/user';

type TDependencies = {
    userRepo: TUserRepository;
};

export const buildUpdateOrganizations = ({ userRepo }: TDependencies) => {
    const execute = async (id: UserDOM['id'], data: TUpdateOrganizations) => {
        return await userRepo.updateOrganizations(id, data);
    };
    return execute;
};
