<script setup lang="ts">
import { Save } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>();
</script>

<template>
    <Save v-bind="props" />
</template>
