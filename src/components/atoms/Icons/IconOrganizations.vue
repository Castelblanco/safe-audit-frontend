<script setup lang="ts">
import { Building2 } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>();
</script>

<template>
    <Building2 v-bind="props" />
</template>
