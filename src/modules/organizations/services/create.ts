import type { OrganizationDOM } from '../domain/entities/organization';
import type { TOrganizationRepository } from '@modules/organizations/domain/repositories/organization';

type TDependencies = {
    organizationRepo: TOrganizationRepository;
};

export const buildCreate = ({ organizationRepo }: TDependencies) => {
    const execute = async (organization: OrganizationDOM) => {
        return await organizationRepo.create(organization);
    };
    return execute;
};
