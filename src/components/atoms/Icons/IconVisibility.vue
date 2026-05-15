<script setup lang="ts">
import { Eye } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>();
</script>

<template>
    <Eye v-bind="props" />
</template>
