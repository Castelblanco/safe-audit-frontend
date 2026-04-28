<script setup lang="ts">
import { QInput } from 'quasar';

export type TInputProps = {
    label?: string;
    class?: string;
    type?: 'text' | 'password';
    name?: string;
};
const model = defineModel<string | undefined | null>();
const { label, ...props } = defineProps<TInputProps>();
</script>

<template>
    <q-input outlined autocomplete="off" v-model="model" :label="label" v-bind="props" />
</template>
