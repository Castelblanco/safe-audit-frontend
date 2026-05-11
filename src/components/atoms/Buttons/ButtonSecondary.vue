<script setup lang="ts">
import type { TButton } from './type';
import { QBtn } from 'quasar';
export type TButtonSecondary = TButton;
const { href, onClick, disabled, ...props } = defineProps<TButtonSecondary>();
</script>

<template>
    <QBtn :to="href" @click="onClick" :disable="disabled" v-bind="props" outline>
        <slot />
    </QBtn>
</template>
