<script setup lang="ts">
import { appRouter } from '@/router';
import type { ROUTES } from '@constants/routes';
import { abortManager } from '@storages/stores/abort_controllers';
appRouter.beforeResolve((_, from) => {
    abortManager.setCurrentRoute(from.path as ROUTES);
});
</script>

<template>
    <RouterView />
</template>
