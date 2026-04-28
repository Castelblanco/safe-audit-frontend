<script setup lang="ts">
import { ROUTES } from '@/constants/routes';
import ButtonPrimary from '@atoms/Buttons/ButtonPrimary.vue';
import H1 from '@atoms/Typography/H1.vue';
</script>

<template>
    <div
        class="tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-3 tw:h-screen"
    >
        <H1 class="tw:text-h1">Bienvenido a Safe Audit</H1>
        <ButtonPrimary :href="ROUTES.LOGIN"> Iniciar Sesion </ButtonPrimary>
    </div>
</template>
