<script setup lang="ts">
import InputText from '@atoms/Inputs/InputText.vue';
import Textarea from '@atoms/Inputs/Textarea.vue';
import H6 from '@atoms/Typography/H6.vue';
import { ROUTES } from '@constants/routes';
import type { AuditDOM } from '@modules/audits/domain/entities/audit';
import ButtonBack from '@molecules/Buttons/ButtonBack.vue';
import ButtonSave from '@molecules/Buttons/ButtonSave.vue';
import InputDateTime from '@molecules/Inputs/InputDateTime.vue';
import SelectAuditStatuses from '@molecules/Selects/SelectAuditStatuses.vue';
import SelectAuditTypes from '@molecules/Selects/SelectAuditTypes.vue';
import LoadingStandar from '@templates/Loadings/LoadingStandar.vue';
import { QCard, QCardSection } from 'quasar';
import { computed, ref, toRaw } from 'vue';

export type TAuditFormProps = {
    isCreate?: boolean;
    onSave: () => Promise<void>;
};

const audit = defineModel<AuditDOM>();
const { isCreate, onSave } = defineProps<TAuditFormProps>();
const loading = ref(false);
const auditCopy = computed(() => JSON.stringify(toRaw(audit.value)));
const disabledSave = computed(() =>
    isCreate ? false : auditCopy.value === JSON.stringify(audit.value),
);

const handleSave = async () => {
    loading.value = true;
    await onSave();
    loading.value = false;
};
</script>

<template>
    <LoadingStandar v-if="!audit" />
    <form v-else class="tw:relative" @submit.prevent>
        <div class="tw:flex tw:gap-5 tw:fixed! tw:top-20 tw:right-10 tw:z-50">
            <ButtonBack :href="ROUTES.AUDITS" />
            <ButtonSave @click="handleSave" :disabled="disabledSave" :loading />
        </div>
        <QCard bordered>
            <QCardSection class="tw:flex tw:flex-wrap tw:gap-5">
                <H6>Información</H6>
                <InputText class="tw:w-full" label="Titulo" v-model="audit.title" />
                <InputDateTime label="Empieza el" v-model="audit.startDate" />
                <InputDateTime label="Termina el" v-model="audit.endDate" />
                <SelectAuditTypes v-model="audit.typeId" />
                <SelectAuditStatuses v-if="!isCreate" v-model="audit.statusId" />
                <Textarea
                    class="tw:w-full"
                    label="Descripción"
                    v-model="audit.description"
                />
            </QCardSection>
        </QCard>
    </form>
</template>
