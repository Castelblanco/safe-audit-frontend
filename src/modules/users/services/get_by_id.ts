import type { UserDOM } from '@modules/users/domain/entities/user';
import type { TUserRepository } from '@modules/users/domain/repositories/user';

type TDependencies = {
    userRepo: TUserRepository;
};

export const buildGetById = ({ userRepo }: TDependencies) => {
    const execute = async (id: UserDOM['id']) => {
        return await userRepo.getById(id);
    };
    return execute;
};
