import type { TAllOperations } from '@common/types/operations';
import type { TenantDOM, TTenantFDOM } from '../entities/tenant';

export type TTenantRepository = TAllOperations<TenantDOM, TTenantFDOM>;
