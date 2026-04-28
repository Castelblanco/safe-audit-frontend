<script setup lang="ts">
import { ROUTES } from '@constants/routes';
import ButtonCreate from '@molecules/Buttons/ButtonCreate.vue';
import ButtonFilter from '@molecules/Buttons/ButtonFilter.vue';
import AuditList from '@organisms/audits/AuditList.vue';
</script>

<template>
    <div class="tw:flex tw:flex-col tw:gap-2">
        <div class="tw:flex tw:justify-end tw:items-center tw:gap-2 tw:w-full">
            <ButtonFilter />
            <ButtonCreate :href="ROUTES.AUDIT_CREATE" />
        </div>
        <AuditList />
    </div>
</template>
