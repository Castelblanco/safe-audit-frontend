<script setup lang="ts">
import { Menu } from '@lucide/vue';
import type { TIcon } from './type';
const props = defineProps<TIcon>();
</script>

<template>
    <Menu v-bind="props" />
</template>
