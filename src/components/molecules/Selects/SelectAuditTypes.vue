<script setup lang="ts">
import type { AuditDOM } from '@modules/audits/domain/entities/audit';
import InputSelect from '@molecules/Inputs/InputSelect.vue';
import { useAuditsStore } from '@storages/stores/audits';
import { computed } from 'vue';

export type TSelectAuditTypes = {
    class?: string;
};
const auditsStore = useAuditsStore();
const model = defineModel<AuditDOM['typeId']>();
const props = defineProps<TSelectAuditTypes>();

const loading = computed(() => auditsStore.types.length === 0);
</script>

<template>
    <InputSelect
        v-model="model"
        :options="auditsStore.types"
        :loading="loading"
        key-label="name"
        key-value="id"
        label="Tipo"
        class="tw:min-w-30"
        v-bind="props"
    />
</template>
