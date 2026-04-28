<script setup lang="ts">
import IconButton, { type TIconButton } from '@atoms/Buttons/IconButton.vue';
import IconFilter from '@atoms/Icons/IconFilter.vue';
import Tooltip from '@molecules/Tooltip.vue';
const props = defineProps<TIconButton>();
</script>

<template>
    <IconButton v-bind="props">
        <IconFilter />
        <Tooltip> <p class="tw:text-body">Filtrar</p> </Tooltip>
    </IconButton>
</template>
