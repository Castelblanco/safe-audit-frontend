import type { SessionDOM } from '@modules/auth/domain/entities/session';
import type { TSessionRepository } from '@modules/auth/domain/repositories/session';
import { ApiReponse } from '@modules/common/dto/responses/api_responses';
import { httpAuth } from '@storages/http/client/instances';
import type { SessionAPI } from './dtos';
import { SessionAdapters } from './adapters';
import type { TApiResponse } from '@modules/common/types/operations';
import { handlerError } from '@storages/http/client/errors';
import { withAbortController } from '@storages/http/client/drivers';

const adapters = new SessionAdapters();

export class SessionHttpRepo implements TSessionRepository {
    create = async (email: string, password: string): Promise<TApiResponse<SessionDOM>> => {
        try {
            return await withAbortController(async (controller) => {
                const { data } = await httpAuth.post<ApiReponse<SessionAPI>>(
                    '/auth/login',
                    {
                        email,
                        password,
                    },
                    {
                        signal: controller.signal,
                    },
                );

                return {
                    data: new ApiReponse(adapters.apiToDom(data.item), data.status),
                    error: null,
                };
            });
        } catch (error) {
            return handlerError(error);
        }
    };
}
