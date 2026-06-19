<script setup lang="ts">
import { AUDIT_INIT } from '@constants/inits';
import { ROUTES } from '@constants/routes';
import { handleResponse } from '@helpers/handle_response';
import AuditForm from '@organisms/audits/AuditForm.vue';
import { servicesAudit } from '@services/audit';
import { useOrganizationsStore } from '@storages/stores/organizations';
import { snackbarStore } from '@storages/stores/snackbar';
import { toRaw } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const organizationStore = useOrganizationsStore();
const router = useRouter();

const audit = ref(
    toRaw({
        ...AUDIT_INIT,
        organizationId: organizationStore.get().id,
    }),
);

const handleSave = async () => {
    const result = await servicesAudit.create(audit.value);
    handleResponse(result, {
        error(error) {
            snackbarStore.error(error.message);
        },
        success(data) {
            audit.value = data.item;
            snackbarStore.success('Auditoria Creada');
            router.replace(`${ROUTES.AUDITS}/${data.item.id}`);
        },
    });
};
</script>

<template>
    <AuditForm v-model="audit" @save="handleSave" is-create />
</template>
