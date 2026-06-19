import type { TAllOperations, TApiResponse } from '@common/types/operations';
import type { TUserFDOM, UserDOM } from '../entities/user';

export type TUpdateOrganizations = {
    added: string[];
    removed: string[];
};

export type TUserRepository = TAllOperations<UserDOM, TUserFDOM> & {
    updateOrganizations: (
        id: UserDOM['id'],
        data: TUpdateOrganizations,
    ) => Promise<TApiResponse<unknown>>;
};
