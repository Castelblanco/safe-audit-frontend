import type { TAllOperations, TListResponse } from '@modules/common/types/operations';
import type { OrganizationDOM, TOrganizationFDOM } from '../entities/organization';
import type { UserDOM } from '@modules/users/domain/entities/user';

export type TOrganizationRepository = TAllOperations<OrganizationDOM, TOrganizationFDOM> & {
    getByUser: (userId: UserDOM['id']) => Promise<TListResponse<OrganizationDOM>>;
};
