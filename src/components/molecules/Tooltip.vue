<script setup lang="ts">
import { QTooltip } from 'quasar';
</script>

<template>
    <QTooltip v-bind="$attrs" anchor="top middle" self="bottom middle">
        <slot />
    </QTooltip>
</template>
