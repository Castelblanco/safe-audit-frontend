<script setup lang="ts">
import { QCircularProgress } from 'quasar';
export type TLoadingCircularProps = {
    class?: string;
};
const { class: classes } = defineProps<TLoadingCircularProps>();
</script>

<template>
    <QCircularProgress
        indeterminate
        rounded
        color="primary"
        :class="`tw:overflow-hidden! ${classes}`"
    />
</template>
