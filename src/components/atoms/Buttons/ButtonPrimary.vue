<script setup lang="ts">
import type { TButton } from './type';
import { QBtn } from 'quasar';
export type TButtonPrimary = TButton;
const { href, onClick, disabled, ...props } = defineProps<TButtonPrimary>();
</script>

<template>
    <QBtn :to="href" @click="onClick" :disable="disabled" v-bind="props" color="primary">
        <slot />
    </QBtn>
</template>
