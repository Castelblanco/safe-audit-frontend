<script setup lang="ts">
import { PencilLine } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>();
</script>

<template>
    <PencilLine v-bind="props" />
</template>
