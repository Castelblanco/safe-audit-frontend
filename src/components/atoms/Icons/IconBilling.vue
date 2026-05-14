<script setup lang="ts">
import { Receipt } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>();
</script>

<template>
    <Receipt v-bind="props" />
</template>
