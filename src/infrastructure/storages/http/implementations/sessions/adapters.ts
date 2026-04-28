import { SessionDOM } from '@modules/auth/domain/entities/session';
import type { TAdapter } from '@modules/common/types/adapters';
import type { SessionAPI } from './dtos';
import { UserAdapters } from '../users/adapters';

const userAdapters = new UserAdapters();
export class SessionAdapters implements TAdapter<SessionDOM, SessionAPI> {
    domToApi = (_: SessionDOM): SessionAPI => {
        throw new Error('This method is not implemented');
    };
    apiToDom = (item: SessionAPI): SessionDOM => {
        return new SessionDOM({
            accessToken: item.access_token,
            user: userAdapters.apiToDom(item.user),
        });
    };
}
