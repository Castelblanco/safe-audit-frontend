import type { TUserStatusFDOM } from '@modules/users/domain/entities/user_status';
import type { TUserStatusRepository } from '@modules/users/domain/repositories/user_status';

type TDependencies = {
    userStatusRepo: TUserStatusRepository;
};

export const buildGetStatus = ({ userStatusRepo }: TDependencies) => {
    const execute = async (filters: TUserStatusFDOM) => {
        return await userStatusRepo.getAll(filters);
    };
    return execute;
};
