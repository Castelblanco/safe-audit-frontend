import type { TOrganizationFDOM } from '../domain/entities/organization';
import type { TOrganizationRepository } from '@modules/organizations/domain/repositories/organization';

type TDependencies = {
    organizationRepo: TOrganizationRepository;
};

export const buildGetAll = ({ organizationRepo }: TDependencies) => {
    const execute = async (filters: TOrganizationFDOM) => {
        return await organizationRepo.getAll(filters);
    };
    return execute;
};
