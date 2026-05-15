import type { TOrganizationRepository } from '@modules/organizations/domain/repositories/organization';

type TDependencies = {
    organizationRepo: TOrganizationRepository;
};

export const buildGetByUser = ({ organizationRepo }: TDependencies) => {
    const execute = async () => {
        return await organizationRepo.getByUser();
    };
    return execute;
};
