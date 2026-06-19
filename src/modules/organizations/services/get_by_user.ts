import type { TOrganizationRepository } from '@modules/organizations/domain/repositories/organization';
import type { UserDOM } from '@modules/users/domain/entities/user';

type TDependencies = {
    organizationRepo: TOrganizationRepository;
};

export const buildGetByUser = ({ organizationRepo }: TDependencies) => {
    const execute = async (userId: UserDOM['id']) => {
        return await organizationRepo.getByUser(userId);
    };
    return execute;
};
