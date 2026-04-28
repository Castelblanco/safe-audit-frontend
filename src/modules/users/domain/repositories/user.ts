import type { TAllOperations } from '@common/types/operations';
import type { TUserFDOM, UserDOM } from '../entities/user';

export type TUserRepository = TAllOperations<UserDOM, TUserFDOM>;
