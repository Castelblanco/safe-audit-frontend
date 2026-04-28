<script setup lang="ts">
import { Sun } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>()
</script>

<template>
    <Sun v-bind="props" />
</template>