<script setup lang="ts">
import { QSeparator } from 'quasar';

export type TMainContentProps = {
    title?: string;
};
const { title } = defineProps<TMainContentProps>();
</script>

<template>
    <main class="tw:p-3 tw:w-full">
        <div v-if="title">
            <h4>{{ title }}</h4>
            <QSeparator />
        </div>
        <slot />
    </main>
</template>
