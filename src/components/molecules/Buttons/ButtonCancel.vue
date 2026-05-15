<script setup lang="ts">
import ButtonPrimary from '@atoms/Buttons/ButtonPrimary.vue';
import ButtonSecondary from '@atoms/Buttons/ButtonSecondary.vue';
import type { TButton } from '@atoms/Buttons/type';
const props = defineProps<TButton>();
</script>

<template>
    <ButtonSecondary v-bind="props"> Cancelar </ButtonSecondary>
</template>
