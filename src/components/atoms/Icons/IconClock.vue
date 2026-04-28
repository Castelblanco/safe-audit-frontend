<script setup lang="ts">
import { Clock } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>();
</script>

<template>
    <Clock v-bind="props" />
</template>
