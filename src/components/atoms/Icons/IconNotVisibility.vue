<script setup lang="ts">
import { EyeOff } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>();
</script>

<template>
    <EyeOff v-bind="props" />
</template>
