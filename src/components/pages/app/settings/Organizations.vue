<script setup lang="ts">
import InputText from '@atoms/Inputs/InputText.vue';
import H6 from '@atoms/Typography/H6.vue';
import { FORMATS_DATE } from '@constants/formats';
import { ORGANIZATION_INIT } from '@constants/inits';
import { handleResponse } from '@helpers/handle_response';
import type { OrganizationDOM } from '@modules/organizations/domain/entities/organization';
import ButtonCancel from '@molecules/Buttons/ButtonCancel.vue';
import ButtonCreate from '@molecules/Buttons/ButtonCreate.vue';
import ButtonDelete from '@molecules/Buttons/ButtonDelete.vue';
import ButtonEdit from '@molecules/Buttons/ButtonEdit.vue';
import ButtonFilter from '@molecules/Buttons/ButtonFilter.vue';
import ButtonSave from '@molecules/Buttons/ButtonSave.vue';
import { servicesOrganizations } from '@services/organizations';
import { useOrganizationsStore } from '@storages/stores/organizations';
import { snackbarStore } from '@storages/stores/snackbar';
import { datetimeTool } from '@tools/datetime';
import { QCard, QCardActions, QCardSection, QDialog, QSeparator } from 'quasar';
import { computed, ref, toRaw, watch } from 'vue';

const orgsStores = useOrganizationsStore();
const orgSelect = ref<OrganizationDOM>();
const orgCopy = computed(() => JSON.stringify(toRaw(orgSelect.value)));
const disabledSave = computed(() => orgCopy.value === JSON.stringify(orgSelect.value));

const showModal = ref(false);
const isCreate = ref(false);
const loading = ref(false);

watch(orgSelect, () => (showModal.value = !!orgSelect.value));

const toggleShowCreate = () => {
    orgSelect.value = { ...ORGANIZATION_INIT };
    isCreate.value = true;
};

const handleEdit = (org: OrganizationDOM) => {
    orgSelect.value = { ...org };
};

const handleCreate = async () => {
    if (!orgSelect.value) return;
    loading.value = true;
    const result = await servicesOrganizations.create(orgSelect.value);
    handleResponse(result, {
        error() {
            snackbarStore.error('Error guardando organizacion');
        },
        success(data) {
            orgsStores.organizations.push(data.item);
            snackbarStore.success('Organizacion guardada');
            toggleShowModal();
        },
    });
    loading.value = false;
};

const handleSave = async () => {
    if (!orgSelect.value) return;
    loading.value = true;
    const result = await servicesOrganizations.update(
        orgSelect.value.id,
        orgSelect.value,
    );
    handleResponse(result, {
        error() {
            snackbarStore.error('Error guardando organizacion');
        },
        success(data) {
            const org = data.item;
            const index = orgsStores.organizations.findIndex(({ id }) => id === org.id);
            if (index === -1) return;
            orgsStores.organizations[index] = org;
            snackbarStore.success('Organizacion guardada');
            toggleShowModal();
        },
    });
    loading.value = false;
};

const toggleShowModal = () => (showModal.value = !showModal.value);
</script>

<template>
    <QDialog v-model="showModal" persistent>
        <QCard bordered class="tw:min-w-2xs">
            <QCardSection> <H6>Editar Organizacion</H6> </QCardSection>
            <QSeparator />
            <QCardSection v-if="orgSelect">
                <form><InputText label="Nombre" v-model="orgSelect.name" /></form>
            </QCardSection>
            <QCardActions align="right">
                <ButtonCancel :disabled="loading" @click="toggleShowModal" />
                <ButtonSave
                    v-if="isCreate"
                    :disabled="disabledSave"
                    :loading="loading"
                    @click="handleCreate"
                />
                <ButtonSave
                    v-else
                    :disabled="disabledSave"
                    :loading="loading"
                    @click="handleSave"
                />
            </QCardActions>
        </QCard>
    </QDialog>
    <div class="tw:flex tw:flex-col tw:gap-2">
        <div class="tw:flex tw:justify-end tw:items-center tw:gap-2 tw:w-full">
            <ButtonFilter />
            <ButtonCreate @click="toggleShowCreate" />
        </div>
        <div class="tw:flex tw:flex-col tw:gap-2">
            <QCard
                v-for="org in orgsStores.organizations"
                class="tw:flex tw:justify-between tw:w-full"
                :key="org.id"
                bordered
                flat
            >
                <QCardSection>
                    <div><span class="tw:font-semibold"> {{ org.name }} </span></div>
                    <div>
                        <span>
                            {{ datetimeTool.formatToText(org.updatedAt, FORMATS_DATE.DATE) }}
                        </span>
                    </div>
                </QCardSection>
                <QCardActions>
                    <ButtonEdit @click="() => handleEdit(org)" />
                    <ButtonDelete />
                </QCardActions>
            </QCard>
        </div>
    </div>
</template>
