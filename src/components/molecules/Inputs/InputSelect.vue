<script setup lang="ts" generic="T">
import { QSelect } from 'quasar';

export type TInputSelect<T = unknown> = {
    options: T[];
    keyLabel: keyof T & string;
    keyValue: keyof T & string;
    class?: string;
    loading?: boolean;
    label?: string;
    multiple?: boolean;
    emitValue?: boolean | undefined;
};
const model = defineModel();
const {
    keyLabel,
    keyValue,
    multiple,
    emitValue = true,
    ...props
} = defineProps<TInputSelect<T>>();
</script>

<template>
    <QSelect
        v-model="model"
        outlined
        :option-label="keyLabel"
        :option-value="keyValue"
        :emit-value="emitValue"
        map-options
        :multiple="multiple"
        :use-chips="multiple"
        :input-class="props.class"
        v-bind="props"
    />
</template>
