import type {
    TAuditStatusFDOM,
    AuditStatusDOM,
} from '@modules/audits/domain/entities/audit_status';
import type { TAuditStatusRepository } from '@modules/audits/domain/repositories/audit_status';
import { ListResponse } from '@modules/common/dto/responses/list_responses';
import type { TListResponse, TGeneralId, TApiResponse } from '@modules/common/types/operations';
import { AuditStatusAdapters } from './adapters';
import { handlerError } from '@storages/http/client/errors';
import { httpV1 } from '@storages/http/client/instances';
import type { AuditStatusAPI } from './dtos';
import { withAbortController } from '@storages/http/client/drivers';

const PATH = '/audits';
const adapters = new AuditStatusAdapters();
export class AuditStatusHttpRepo implements TAuditStatusRepository {
    getAll = async (filters: TAuditStatusFDOM): Promise<TListResponse<AuditStatusDOM>> => {
        try {
            return withAbortController(async (controller) => {
                const { data } = await httpV1.get<ListResponse<AuditStatusAPI>>(
                    `${PATH}/get-status`,
                    {
                        signal: controller.signal,
                        params: filters,
                    },
                );

                return {
                    data: new ListResponse(
                        data.items.map(adapters.apiToDom),
                        data.total,
                        data.status,
                    ),
                    error: null,
                };
            });
        } catch (error) {
            return handlerError(error);
        }
    };
    getById = async (_: TGeneralId): Promise<TApiResponse<AuditStatusDOM>> => {
        throw new Error('This method is not implemented');
    };
    getOne = async (_: TAuditStatusFDOM): Promise<TApiResponse<AuditStatusDOM>> => {
        throw new Error('This method is not implemented');
    };
}
