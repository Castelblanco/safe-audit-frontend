import type { OrganizationDOM } from '../domain/entities/organization';
import type { TOrganizationRepository } from '@modules/organizations/domain/repositories/organization';

type TDependencies = {
    organizationRepo: TOrganizationRepository;
};

export const buildUpdate = ({ organizationRepo }: TDependencies) => {
    const execute = async (id: OrganizationDOM['id'], item: Partial<OrganizationDOM>) => {
        return await organizationRepo.update(id, item);
    };
    return execute;
};
