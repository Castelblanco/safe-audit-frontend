<script setup lang="ts">
import type { TButton } from './type';
import { QBtn } from 'quasar';
export type TIconButton = TButton;
const { href, onClick, disabled, ...props } = defineProps<TIconButton>();
</script>

<template>
    <QBtn
        :to="href"
        @click="onClick"
        :disable="disabled"
        v-bind="props"
        flat
        round
    >
        <slot />
    </QBtn>
</template>
