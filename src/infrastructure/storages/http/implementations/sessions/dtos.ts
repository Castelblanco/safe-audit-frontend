import type { UserAPI } from '../users/dtos';

export type TSessionAPI = {
    access_token: string;
    user: UserAPI;
};

export class SessionAPI implements TSessionAPI {
    access_token: string;
    user: UserAPI;

    constructor(item: TSessionAPI) {
        this.access_token = item.access_token;
        this.user = item.user;
    }
}
