import {
    buildCreate,
    buildGetAll,
    buildGetById,
    buildGetRoles,
    buildGetStatus,
    buildUpdate,
    buildUpdateOrganizations,
} from '@modules/users/services';
import { RoleHttpRepo } from '@storages/http/implementations/roles/repository';
import { UserStatusHttpRepo } from '@storages/http/implementations/user_status/repository';
import { UserHttpRepo } from '@storages/http/implementations/users/repository';

const userRepo = new UserHttpRepo('/users');
const roleRepo = new RoleHttpRepo('/roles');
const userStatusRepo = new UserStatusHttpRepo('/users/get-status');

export const servicesUsers = {
    getAll: buildGetAll({ userRepo }),
    getById: buildGetById({ userRepo }),
    update: buildUpdate({ userRepo }),
    create: buildCreate({ userRepo }),
    updateOrganizations: buildUpdateOrganizations({ userRepo }),

    // Aditionañ data
    getRoles: buildGetRoles({ roleRepo }),
    getStatuses: buildGetStatus({ userStatusRepo }),
};
