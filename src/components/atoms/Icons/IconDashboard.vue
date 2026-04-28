<script setup lang="ts">
import { LayoutDashboardIcon } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>()
</script>

<template>
    <LayoutDashboardIcon v-bind="props" />
</template>