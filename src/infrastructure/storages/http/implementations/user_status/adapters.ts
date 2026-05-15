import type { TAdapter } from '@modules/common/types/adapters';
import { UserStatusAPI } from './dtos';
import { UserStatusDOM } from '@modules/users/domain/entities/user_status';

export class UserStatusAdapters implements TAdapter<UserStatusDOM, UserStatusAPI> {
    domToApi = (item: UserStatusDOM): UserStatusAPI => {
        return new UserStatusAPI({
            _id: item.id,
            name: item.name,
            created_at: item.createdAt.toISOString(),
            updated_at: item.updatedAt.toISOString(),
            deleted_at: item.deletedAt?.toISOString() || null,
        });
    };
    apiToDom = (item: UserStatusAPI): UserStatusDOM => {
        return new UserStatusDOM({
            id: item?._id as number,
            name: item.name,
            createdAt: item.created_at ? new Date(item.created_at) : new Date(),
            updatedAt: item.updated_at ? new Date(item.updated_at) : new Date(),
            deletedAt: null,
        });
    };
    partialDomToApi = (item: Partial<UserStatusDOM>): Partial<UserStatusAPI> => {
        return {
            _id: item.id,
            name: item.name,
            created_at: item.createdAt?.toISOString(),
            updated_at: item.updatedAt?.toISOString(),
            deleted_at: item.deletedAt?.toISOString() || null,
        };
    };
}
