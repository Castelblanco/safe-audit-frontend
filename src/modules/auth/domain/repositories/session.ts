import type { SessionDOM } from '../entities/session';
import type { TApiResponse } from '@modules/common/types/operations';

export type TSessionRepository = {
    create: (email: string, password: string) => Promise<TApiResponse<SessionDOM>>;
};
