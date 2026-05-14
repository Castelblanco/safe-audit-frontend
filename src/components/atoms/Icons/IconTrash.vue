<script setup lang="ts">
import { Trash2 } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>();
</script>

<template>
    <Trash2 v-bind="props" />
</template>
