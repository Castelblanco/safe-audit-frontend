<script setup lang="ts">
import { X } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>();
</script>

<template>
    <X v-bind="props" />
</template>
