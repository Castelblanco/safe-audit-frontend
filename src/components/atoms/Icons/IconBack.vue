<script setup lang="ts">
import { ChevronLeft } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>();
</script>

<template>
    <ChevronLeft v-bind="props" />
</template>
