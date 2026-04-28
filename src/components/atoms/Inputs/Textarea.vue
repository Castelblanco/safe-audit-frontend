<script setup lang="ts">
import { QInput } from 'quasar';

export type TTextarea = {
    label?: string;
    class?: string;
    name?: string;
};
const model = defineModel<string | undefined | null>();
const props = defineProps<TTextarea>();
</script>

<template>
    <QInput
        v-model="model"
        outlined
        type="textarea"
        input-class="tw:resize-none! tw:field-sizing-content"
        v-bind="props"
    />
</template>
