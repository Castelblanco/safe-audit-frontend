<script setup lang="ts">
import { Moon } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>()
</script>

<template>
    <Moon v-bind="props" />
</template>