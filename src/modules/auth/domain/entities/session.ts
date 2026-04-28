import type { UserDOM } from '@modules/users/domain/entities/user';

export type TSessionDOM = {
    accessToken: string;
    user: UserDOM;
};

export class SessionDOM implements TSessionDOM {
    accessToken: string;
    user: UserDOM;

    constructor(item: TSessionDOM) {
        this.accessToken = item.accessToken;
        this.user = item.user;
    }
}
