<script setup lang="ts">
import type { AuditDOM } from '@modules/audits/domain/entities/audit';
import InputSelect from '@molecules/Inputs/InputSelect.vue';
import { useAuditsStore } from '@storages/stores/audits';
import { computed } from 'vue';

export type TSelectAuditStatuses = {
    class?: string;
};
const auditsStore = useAuditsStore();
const model = defineModel<AuditDOM['statusId']>();
const props = defineProps<TSelectAuditStatuses>();

const loading = computed(() => auditsStore.statuses.length === 0);
</script>

<template>
    <InputSelect
        v-model="model"
        :options="auditsStore.statuses"
        :loading="loading"
        key-label="name"
        key-value="id"
        label="Estado"
        class="tw:min-w-30"
        v-bind="props"
    />
</template>
