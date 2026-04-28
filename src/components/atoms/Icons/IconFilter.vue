<script setup lang="ts">
import { ListFilter } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>();
</script>

<template>
    <ListFilter v-bind="props" />
</template>
