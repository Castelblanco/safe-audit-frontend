<script setup lang="ts">
import IconButton, { type TIconButton } from '@atoms/Buttons/IconButton.vue';
import IconSave from '@atoms/Icons/IconSave.vue';
import Tooltip from '@molecules/Tooltip.vue';
const props = defineProps<TIconButton>();
</script>

<template>
    <IconButton v-bind="props">
        <IconSave />
        <Tooltip> <p class="tw:text-body">Guardar</p> </Tooltip>
    </IconButton>
</template>
