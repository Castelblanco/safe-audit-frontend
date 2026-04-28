<script setup lang="ts">
import IconButton, { type TIconButton } from '@atoms/Buttons/IconButton.vue';
import IconPlus from '@atoms/Icons/IconPlus.vue';
import Tooltip from '@molecules/Tooltip.vue';
const props = defineProps<TIconButton>();
</script>

<template>
    <IconButton v-bind="props">
        <IconPlus />
        <Tooltip> <p class="tw:text-body">Crear</p> </Tooltip>
    </IconButton>
</template>
