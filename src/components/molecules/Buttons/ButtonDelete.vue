<script setup lang="ts">
import IconButton, { type TIconButton } from '@atoms/Buttons/IconButton.vue';
import IconTrash from '@atoms/Icons/IconTrash.vue';
import Tooltip from '@molecules/Tooltip.vue';
const props = defineProps<TIconButton>();
</script>

<template>
    <IconButton v-bind="props">
        <IconTrash />
        <Tooltip> <p class="tw:text-body">Borrar</p> </Tooltip>
    </IconButton>
</template>
