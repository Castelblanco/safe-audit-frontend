import {
    buildCreate,
    buildGetAll,
    buildGetById,
    buildGetStatuses,
    buildGetTypes,
    buildUpdate,
} from '@modules/audits/services';
import { AuditStatusHttpRepo } from '@storages/http/implementations/audit_status/repository';
import { AuditTypesHttpRepo } from '@storages/http/implementations/audit_type/repository';
import { AuditHttpRepo } from '@storages/http/implementations/audits/repository';

const auditRepo = new AuditHttpRepo();
const auditStatusRepo = new AuditStatusHttpRepo();
const auditTypeRepo = new AuditTypesHttpRepo();

export const servicesAudit = {
    getAll: buildGetAll({ auditRepo }),
    getById: buildGetById({ auditRepo }),
    getStatuses: buildGetStatuses({ auditStatusRepo }),
    getTypes: buildGetTypes({ auditTypeRepo }),
    create: buildCreate({ auditRepo }),
    update: buildUpdate({ auditRepo }),
};
