import type { TUserFDOM } from '@modules/users/domain/entities/user';
import type { TUserRepository } from '@modules/users/domain/repositories/user';

type TDependencies = {
    userRepo: TUserRepository;
};

export const buildGetAll = ({ userRepo }: TDependencies) => {
    const execute = async (filters: TUserFDOM) => {
        return await userRepo.getAll(filters);
    };
    return execute;
};
