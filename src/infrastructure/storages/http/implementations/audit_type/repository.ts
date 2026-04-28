import type { AuditTypeDOM, TAuditTypeFDOM } from '@modules/audits/domain/entities/audit_type';
import type { TAuditStatusRepository } from '@modules/audits/domain/repositories/audit_status';
import { ListResponse } from '@modules/common/dto/responses/list_responses';
import type { TListResponse, TGeneralId, TApiResponse } from '@modules/common/types/operations';
import { AuditTypeAdapters } from './adapters';
import { handlerError } from '@storages/http/client/errors';
import { httpV1 } from '@storages/http/client/instances';
import type { AuditTypeAPI } from './dtos';
import { withAbortController } from '@storages/http/client/abort_controller';

const PATH = '/audits';
const adapters = new AuditTypeAdapters();
export class AuditTypesHttpRepo implements TAuditStatusRepository {
    getAll = async (filters: TAuditTypeFDOM): Promise<TListResponse<AuditTypeDOM>> => {
        try {
            return withAbortController(async (controller) => {
                const { data } = await httpV1.get<ListResponse<AuditTypeAPI>>(`${PATH}/get-types`, {
                    signal: controller.signal,
                    params: filters,
                });

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
    getById = async (_: TGeneralId): Promise<TApiResponse<AuditTypeDOM>> => {
        throw new Error('This method is not implemented');
    };
    getOne = async (_: TAuditTypeFDOM): Promise<TApiResponse<AuditTypeDOM>> => {
        throw new Error('This method is not implemented');
    };
}
