<script setup lang="ts">
import { Plus } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>();
</script>

<template>
    <Plus v-bind="props" />
</template>
