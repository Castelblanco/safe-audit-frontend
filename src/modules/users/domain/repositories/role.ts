import type { TReadOperations } from '@common/types/operations';
import type { TRoleFDOM, RoleDOM } from '../entities/role';

export type TRoleRepository = TReadOperations<RoleDOM, TRoleFDOM>;
