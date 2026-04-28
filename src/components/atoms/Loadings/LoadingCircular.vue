<script setup lang="ts">
import { QCircularProgress } from 'quasar';
export type TLoadingCircularProps = {
    class?: string;
};
const props = defineProps<TLoadingCircularProps>();
</script>

<template>
    <QCircularProgress indeterminate rounded color="primary" v-bind="props" />
</template>
