<script setup lang="ts">
import { useAuditsStore } from '@storages/stores/audits';
import { useOrganizationsStore } from '@storages/stores/organizations';
import { useSessionStore } from '@storages/stores/session';
import { useTenantStore } from '@storages/stores/tenant';
import { useUsersStore } from '@storages/stores/users';
import LoadingPage from '@templates/Loadings/LoadingPage.vue';
import Navigation from '@templates/Navigation.vue';
import { ref, watch } from 'vue';

const sessionStore = useSessionStore();
const auditsStore = useAuditsStore();
const organizationsStore = useOrganizationsStore();
const tenantStore = useTenantStore();
const usersStore = useUsersStore();

const loading = ref(true);
watch(
    () => [sessionStore.value, organizationsStore.orgSelect],
    () => {
        // Validate session and get organizations
        if (sessionStore.value !== undefined && !organizationsStore.orgSelect) {
            return organizationsStore.init();
        }
        // Disabled app
        auditsStore.init();
        usersStore.init();
        tenantStore.init();
        loading.value = false;
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
