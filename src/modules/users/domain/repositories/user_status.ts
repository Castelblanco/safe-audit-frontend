import type { TReadOperations } from '@common/types/operations';
import type { TUserStatusFDOM, UserStatusDOM } from '../entities/user_status';

export type TUserStatusRepository = TReadOperations<UserStatusDOM, TUserStatusFDOM>;
