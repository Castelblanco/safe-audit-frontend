<script setup lang="ts">
import IconButton, { type TIconButton } from '@atoms/Buttons/IconButton.vue';
import IconEdit from '@atoms/Icons/IconEdit.vue';
import Tooltip from '@molecules/Tooltip.vue';
const props = defineProps<TIconButton>();
</script>

<template>
    <IconButton v-bind="props">
        <IconEdit />
        <Tooltip> <p class="tw:text-body">Editar</p> </Tooltip>
    </IconButton>
</template>
