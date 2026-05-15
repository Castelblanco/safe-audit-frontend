import type { UserDOM } from '@modules/users/domain/entities/user';
import type { TUserRepository } from '@modules/users/domain/repositories/user';

type TDependencies = {
    userRepo: TUserRepository;
};

export const buildUpdate = ({ userRepo }: TDependencies) => {
    const execute = async (id: UserDOM['id'], user: Partial<UserDOM>) => {
        return await userRepo.update(id, user);
    };
    return execute;
};
