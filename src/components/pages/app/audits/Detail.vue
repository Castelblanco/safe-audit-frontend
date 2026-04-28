<script setup lang="ts">
import InputText from '@atoms/Inputs/InputText.vue';
import Textarea from '@atoms/Inputs/Textarea.vue';
import LoadingCircular from '@atoms/Loadings/LoadingCircular.vue';
import H6 from '@atoms/Typography/H6.vue';
import { FORMATS_DATE } from '@constants/formats';
import { ROUTES } from '@constants/routes';
import { handleResponse } from '@helpers/handle_response';
import type { AuditDOM } from '@modules/audits/domain/entities/audit';
import InputDateTime from '@molecules/Inputs/InputDateTime.vue';
import { servicesAudit } from '@services/audit';
import { useAuditsStore } from '@storages/stores/audits';
import { snackbarStore } from '@storages/stores/snackbar';
import LoadingStandar from '@templates/Loadings/LoadingStandar.vue';
import { QCard, QCardSection, QSeparator } from 'quasar';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const { statuses } = useAuditsStore();

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
</script>

<template>
    <LoadingStandar v-if="!audit" />
    <div v-else>
        <QCard bordered>
            <QCardSection class="tw:flex tw:flex-col tw:gap-5">
                <H6>Base</H6>
                <InputText label="Titulo" v-model="audit.title" />
                <Textarea label="Descripcion" v-model="audit.description" />
            </QCardSection>
            <QSeparator inset />
            <QCardSection class="tw:flex tw:flex-col tw:gap-5">
                <H6>Tiempo</H6>
                <div class="tw:flex tw:gap-5">
                    <InputDateTime label="Empieza el" v-model="audit.startDate" />
                    <InputDateTime label="Termina el" v-model="audit.endDate" />
                </div>
            </QCardSection>
        </QCard>
    </div>
</template>
