<script setup lang="ts">
import { DISPLAY_NOT_CONTENT } from '@constants/displays';
import { TYPES_AUDIT } from '@constants/types';
import type { AuditDOM } from '@modules/audits/domain/entities/audit';
import { computed } from 'vue';

export type TAuditStatusProps = {
    typeId: AuditDOM['typeId'];
};

type TConfig = {
    label: string;
};

let { typeId } = defineProps<TAuditStatusProps>();

const TYPE_CONFIG: Record<TYPES_AUDIT, TConfig | undefined> = {
    [TYPES_AUDIT.INTERNAL]: {
        label: 'Interna',
    },
    [TYPES_AUDIT.EXTERNAL]: {
        label: 'Externa',
    },
    [TYPES_AUDIT.LEGAL]: {
        label: 'Legal',
    },
    [TYPES_AUDIT.ISO]: {
        label: 'ISO',
    },
    [TYPES_AUDIT.SAFETY]: {
        label: 'Seguridad',
    },
};

const typeSelect = computed(() => TYPE_CONFIG[typeId as TYPES_AUDIT]);
</script>

<template>
    <p v-if="typeSelect">{{ typeSelect.label }}</p>
    <p v-else>{{ DISPLAY_NOT_CONTENT.NOT_SET }}</p>
</template>
