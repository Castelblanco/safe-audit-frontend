import {
    buildCreate,
    buildGetAll,
    buildGetByUser,
    buildUpdate,
} from '@modules/organizations/services';
import { OrganizationHttpRepo } from '@storages/http/implementations/organizations/repository';

const organizationRepo = new OrganizationHttpRepo();

export const servicesOrganizations = {
    getAll: buildGetAll({ organizationRepo }),
    getByUser: buildGetByUser({ organizationRepo }),
    create: buildCreate({ organizationRepo }),
    update: buildUpdate({ organizationRepo }),
};
