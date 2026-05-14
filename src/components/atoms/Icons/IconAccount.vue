<script setup lang="ts">
import { Building } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>();
</script>

<template>
    <Building v-bind="props" />
</template>
