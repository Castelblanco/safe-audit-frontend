<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

const props = defineProps</* @vue-ignore */ HTMLAttributes>();
</script>

<template>
    <h1 class="tw:text-h6" v-bind="props"><slot /></h1>
</template>
