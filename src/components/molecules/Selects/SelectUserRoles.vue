<script setup lang="ts">
import type { UserDOM } from '@modules/users/domain/entities/user';
import InputSelect from '@molecules/Inputs/InputSelect.vue';
import { useUsersStore } from '@storages/stores/users';
import { computed } from 'vue';

export type TSelectUserStatuses = {
    class?: string;
};
const usersStore = useUsersStore();
const model = defineModel<UserDOM['roleId']>();
const props = defineProps<TSelectUserStatuses>();

const loading = computed(() => usersStore.roles.length === 0);
</script>

<template>
    <InputSelect
        v-model="model"
        :options="usersStore.roles"
        :loading="loading"
        key-label="name"
        key-value="id"
        label="Estado"
        class="tw:min-w-30"
        v-bind="props"
    />
</template>
