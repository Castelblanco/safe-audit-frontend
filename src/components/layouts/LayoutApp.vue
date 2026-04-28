<script setup lang="ts">
import { useAuditsStore } from '@storages/stores/audits';
import { useSessionStore } from '@storages/stores/session';
import LoadingPage from '@templates/Loadings/LoadingPage.vue';
import Navigation from '@templates/Navigation.vue';
import { ref, watch } from 'vue';

const sessionStore = useSessionStore();
const auditsStore = useAuditsStore();

const loading = ref(true);
watch(
    () => sessionStore.value,
    () => {
        if (sessionStore.value !== undefined) {
            loading.value = false;
            auditsStore.init();
        }
    },
    {
        immediate: true,
    },
);
</script>

<template>
    <LoadingPage v-if="loading" />
    <Navigation v-else> <RouterView /> </Navigation>
</template>
