<script setup lang="ts">
import ButtonPrimary, { type TButtonPrimary } from '@atoms/Buttons/ButtonPrimary.vue';
const props = defineProps<TButtonPrimary>();
</script>

<template>
    <ButtonPrimary v-bind="props"> Guardar </ButtonPrimary>
</template>
