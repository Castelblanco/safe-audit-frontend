import { handleResponse } from '@helpers/handle_response';
import type { RoleDOM } from '@modules/users/domain/entities/role';
import type { UserStatusDOM } from '@modules/users/domain/entities/user_status';
import { servicesUsers } from '@services/users';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import { ref } from 'vue';

export const useUsersStore = defineStore('users-store', () => {
    const statuses = ref<UserStatusDOM[]>([]);
    const roles = ref<RoleDOM[]>([]);
    const rolesNameIndex = computed(() => {
        const index: Record<RoleDOM['id'], RoleDOM['name']> = {};
        roles.value.forEach((role) => {
            index[role.id] = role.name;
        });
        return index;
    });

    const getRoles = async () => {
        if (roles.value.length > 0) return;
        const result = await servicesUsers.getRoles({});
        handleResponse(result, {
            error(_) {},
            success: ({ items }) => {
                roles.value = items;
            },
        });
    };

    const getStatuses = async () => {
        if (statuses.value.length > 0) return;
        const result = await servicesUsers.getStatuses({});
        handleResponse(result, {
            error(_) {},
            success: ({ items }) => {
                statuses.value = items;
            },
        });
    };

    const init = async () => {
        await Promise.all([getStatuses(), getRoles()]);
    };

    const getRoleName = (id: RoleDOM['id']) => rolesNameIndex.value[id];

    return {
        roles,
        statuses,
        init,
        getRoleName,
    };
});
