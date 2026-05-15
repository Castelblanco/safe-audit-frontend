<script setup lang="ts">
import ButtonPrimary from '@atoms/Buttons/ButtonPrimary.vue';
import type { TButton } from '@atoms/Buttons/type';
const props = defineProps<TButton>();
</script>

<template>
    <ButtonPrimary v-bind="props"> Actualizar </ButtonPrimary>
</template>
