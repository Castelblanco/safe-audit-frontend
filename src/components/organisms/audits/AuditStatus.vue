<script setup lang="ts">
import { STATUS_AUDIT } from '@constants/status';
import type { AuditDOM } from '@modules/audits/domain/entities/audit';
import { computed } from 'vue';

export type TAuditStatusProps = {
    statusId: AuditDOM['statusId'];
};

type TConfig = {
    label: string;
    color?: string;
};
const STATUS_CONFIG: Record<STATUS_AUDIT, TConfig> = {
    [STATUS_AUDIT.DRAFT]: {
        label: 'Borrador',
    },
    [STATUS_AUDIT.SCHEDULED]: {
        label: 'Programada',
        color: 'tw:text-blue-500',
    },
    [STATUS_AUDIT.IN_PROGRESS]: {
        label: 'En Progreso',
        color: 'tw:text-yellow-500',
    },
    [STATUS_AUDIT.COMPLETED]: {
        label: 'Completada',
        color: 'tw:text-green-500',
    },
    [STATUS_AUDIT.CANCELED]: {
        label: 'Cancelada',
        color: 'tw:text-red-500',
    },
};
const { statusId } = defineProps<TAuditStatusProps>();
const statusSelected = computed(() => STATUS_CONFIG[statusId as STATUS_AUDIT]);
</script>

<template>
    <p :class="statusSelected.color" class="tw:text-body">{{ statusSelected.label }}</p>
</template>
