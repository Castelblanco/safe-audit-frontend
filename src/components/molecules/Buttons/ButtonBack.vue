<script setup lang="ts">
import IconButton, { type TIconButton } from '@atoms/Buttons/IconButton.vue';
import IconBack from '@atoms/Icons/IconBack.vue';
import Tooltip from '@molecules/Tooltip.vue';
const props = defineProps<TIconButton>();
</script>

<template>
    <IconButton v-bind="props">
        <IconBack />
        <Tooltip> <p class="tw:text-body">Volver</p> </Tooltip>
    </IconButton>
</template>
