<script setup lang="ts">
import { Shield } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>()
</script>

<template>
    <Shield v-bind="props" />
</template>