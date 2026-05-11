import type { TAllOperations } from '@modules/common/types/operations';
import type { OrganizationDOM, TOrganizationFDOM } from '../entities/organization';

export type TOrganizationRepository = TAllOperations<OrganizationDOM, TOrganizationFDOM>;
