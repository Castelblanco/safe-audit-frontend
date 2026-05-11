<script setup lang="ts">
import { Settings } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>();
</script>

<template>
    <Settings v-bind="props" />
</template>
