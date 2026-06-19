<script setup lang="ts">
import { ROUTES } from '@constants/routes';
import { handleResponse } from '@helpers/handle_response';
import type { AuditDOM } from '@modules/audits/domain/entities/audit';
import AuditForm from '@organisms/audits/AuditForm.vue';
import { servicesAudit } from '@services/audit';
import { snackbarStore } from '@storages/stores/snackbar';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const audit = ref<AuditDOM>();

onMounted(async () => {
    const result = await servicesAudit.getById(route.params.id as string);
    handleResponse(result, {
        error(error) {
            snackbarStore.error(error.message);
            router.replace(ROUTES.AUDITS);
        },
        success(data) {
            audit.value = data.item;
        },
    });
});

const handleSave = async () => {
    if (!audit.value) return;
    const result = await servicesAudit.update(audit.value.id, audit.value);
    handleResponse(result, {
        error(error) {
            snackbarStore.error(error.message);
        },
        success(data) {
            audit.value = data.item;
            snackbarStore.success('Auditoria Actualizada');
        },
    });
};
</script>

<template>
    <AuditForm v-model="audit" @save="handleSave" />
</template>
