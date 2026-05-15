<script setup lang="ts">
import { QInput } from 'quasar';

export type TInputTextProps = {
    label?: string;
    class?: string;
    type?: 'text' | 'password';
    name?: string;
};
const model = defineModel<string | undefined | null>();
const { label, ...props } = defineProps<TInputTextProps>();
</script>

<template>
    <QInput outlined autocomplete="off" v-model="model" :label="label" v-bind="props">
        <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]>
            <slot :name="slotName" />
        </template>
    </QInput>
</template>
