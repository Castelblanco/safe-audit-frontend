<script setup lang="ts">
import LoadingCircular from '@atoms/Loadings/LoadingCircular.vue';
import { USER_INIT } from '@constants/inits';
import { handleResponse } from '@helpers/handle_response';
import type { OrganizationDOM } from '@modules/organizations/domain/entities/organization';
import type { UserDOM } from '@modules/users/domain/entities/user';
import ButtonCreate from '@molecules/Buttons/ButtonCreate.vue';
import ButtonDelete from '@molecules/Buttons/ButtonDelete.vue';
import ButtonEdit from '@molecules/Buttons/ButtonEdit.vue';
import ButtonFilter from '@molecules/Buttons/ButtonFilter.vue';
import UserForm from '@organisms/users/UserForm.vue';
import { servicesOrganizations } from '@services/organizations';
import { servicesUsers } from '@services/users';
import { useSessionStore } from '@storages/stores/session';
import { snackbarStore } from '@storages/stores/snackbar';
import { useUsersStore } from '@storages/stores/users';
import { QCard, QCardActions, QCardSection, QDialog } from 'quasar';
import { computed, onMounted, ref, toRaw, watch } from 'vue';

const sessionStore = useSessionStore();
const usersStore = useUsersStore();
const users = ref<UserDOM[]>([]);
const userEdit = ref<UserDOM>();
const userOrgsEdit = ref<OrganizationDOM[]>([]);
const userOrgsOriginal = ref<OrganizationDOM[]>([]);
const userCreate = ref<UserDOM>(toRaw(USER_INIT));
const total = ref(0);
const showCreate = ref(false);
const loadingSelected = ref(false);
const loadingUpdate = ref(false);
const showEdit = computed(() => !!userEdit.value && !showCreate.value);

const loadUsers = async () => {
    const results = await servicesUsers.getAll({
        tenantId: sessionStore.get().user.tenantId,
    });

    handleResponse(results, {
        error(error) {
            snackbarStore.error(error.message);
        },
        success(data) {
            users.value = data.items;
            total.value = data.total;
        },
    });
};

// Get users
onMounted(loadUsers);

// Reset user create
watch(showCreate, () => {
    if (!showCreate.value) {
        userCreate.value = USER_INIT;
        userOrgsEdit.value = [];
        userOrgsOriginal.value = [];
    }
});

const handleSelect = async (user: UserDOM) => {
    loadingSelected.value = true;
    userEdit.value = { ...user };
    const result = await servicesOrganizations.getByUser(user.id);
    handleResponse(result, {
        error(error) {
            snackbarStore.error(error.message);
            hideModal();
        },
        success(data) {
            userOrgsEdit.value = data.items;
            userOrgsOriginal.value = data.items.map((o) => ({ ...o }));
        },
    });
    loadingSelected.value = false;
};

const handleCreate = async () => {};

const handleUpdate = async () => {
    if (!userEdit.value) return;
    loadingUpdate.value = true;
    const userId = userEdit.value.id;

    const userResult = await servicesUsers.update(userId, userEdit.value);
    handleResponse(userResult, {
        error(error) {
            snackbarStore.error(error.message);
        },
        success: async () => {
            const currentIds = userOrgsEdit.value.map((o) => o.id);
            const originalIds = userOrgsOriginal.value.map((o) => o.id);

            const added = currentIds.filter((id) => !originalIds.includes(id));
            const removed = originalIds.filter((id) => !currentIds.includes(id));

            if (added.length === 0 && removed.length === 0) {
                snackbarStore.success('Usuario actualizado correctamente');
                hideModal();
                return loadUsers();
            }
            const orgResult = await servicesUsers.updateOrganizations(userId, {
                added,
                removed,
            });
            handleResponse(orgResult, {
                error(error) {
                    snackbarStore.error(error.message);
                },
                success() {
                    snackbarStore.success('Usuario actualizado correctamente');
                    hideModal();
                    loadUsers();
                },
            });
            loadingUpdate.value = false;
        },
    });
};

const hideModal = () => {
    userEdit.value = undefined;
    userOrgsOriginal.value = [];
};

const toggleShowCreate = () => (showCreate.value = !showCreate.value);
</script>

<template>
    <!-- User Edit -->
    <QDialog v-model="showEdit" persistent>
        <LoadingCircular class="tw:size-15!" v-if="loadingSelected" />
        <UserForm
            v-else
            v-model="userEdit"
            v-model:user-orgs="userOrgsEdit"
            :loading="loadingUpdate"
            @cancel="hideModal"
            @save="handleUpdate"
        />
    </QDialog>
    <!-- User Create -->
    <QDialog v-model="showCreate" persistent>
        <LoadingCircular class="tw:size-15" v-if="loadingSelected" />
        <UserForm
            v-else
            v-model="userCreate"
            v-model:user-orgs="userOrgsEdit"
            is-create
            @cancel="hideModal"
            @create="handleCreate"
        />
    </QDialog>
    <div class="tw:flex tw:flex-col tw:gap-2">
        <div class="tw:flex tw:justify-end tw:items-center tw:gap-2 tw:w-full">
            <ButtonFilter />
            <ButtonCreate @click="toggleShowCreate" />
        </div>
        <div class="tw:flex tw:gap-2">
            <QCard v-for="user in users" class="tw:flex tw:justify-between tw:w-full">
                <QCardSection>
                    <div>
                        <span class="tw:font-semibold">
                            {{ user.firstName }} {{ user.lastName }}
                        </span>
                    </div>
                    <div>
                        <span>{{ usersStore.getRoleName(user.roleId) }}</span>
                        - <span>{{ user.email }}</span>
                    </div>
                </QCardSection>
                <QCardActions>
                    <ButtonEdit @click="() => handleSelect(user)" />
                    <ButtonDelete />
                </QCardActions>
            </QCard>
        </div>
    </div>
</template>
