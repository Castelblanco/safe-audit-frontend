<script setup lang="ts">
import { Users } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>();
</script>

<template>
    <Users v-bind="props" />
</template>
