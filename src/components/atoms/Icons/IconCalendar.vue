<script setup lang="ts">
import { CalendarSearch } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>()
</script>

<template>
    <CalendarSearch v-bind="props" />
</template>