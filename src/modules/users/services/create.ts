import type { UserDOM } from '@modules/users/domain/entities/user';
import type { TUserRepository } from '@modules/users/domain/repositories/user';

type TDependencies = {
    userRepo: TUserRepository;
};

export const buildCreate = ({ userRepo }: TDependencies) => {
    const execute = async (item: UserDOM) => {
        return await userRepo.create(item);
    };
    return execute;
};
