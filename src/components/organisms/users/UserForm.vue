<script setup lang="ts">
import InputText from '@atoms/Inputs/InputText.vue';
import H6 from '@atoms/Typography/H6.vue';
import type { OrganizationDOM } from '@modules/organizations/domain/entities/organization';
import type { UserDOM } from '@modules/users/domain/entities/user';
import ButtonCancel from '@molecules/Buttons/ButtonCancel.vue';
import ButtonSave from '@molecules/Buttons/ButtonSave.vue';
import ButtonUpdate from '@molecules/Buttons/ButtonUpdate.vue';
import InputSelect from '@molecules/Inputs/InputSelect.vue';
import SelectUserRoles from '@molecules/Selects/SelectUserRoles.vue';
import SelectUserStatuses from '@molecules/Selects/SelectUserStatuses.vue';
import { useOrganizationsStore } from '@storages/stores/organizations';
import { QCard, QCardActions, QCardSection, QSeparator } from 'quasar';
import { computed, toRaw } from 'vue';

export type TUserFormProps = {
    isCreate?: boolean;
    loading?: boolean;
    onCreate?: () => Promise<void>;
    onSave?: () => Promise<void>;
    onCancel?: () => void;
};

const model = defineModel<UserDOM>();
const userOrgs = defineModel<OrganizationDOM[]>('userOrgs');
defineProps<TUserFormProps>();

const orgsStore = useOrganizationsStore();

const userCopy = JSON.stringify(toRaw(model.value));
const userOrgsCopy = JSON.stringify(toRaw(userOrgs.value));

const disabledAction = computed(
    () =>
        userCopy === JSON.stringify(model.value) &&
        userOrgsCopy === JSON.stringify(userOrgs.value),
);
</script>

<template>
    <QCard bordered>
        <QCardSection>
            <H6 v-if="isCreate">Crear Usuario</H6>
            <H6 v-else>Editar Usuario</H6>
        </QCardSection>
        <QSeparator />
        <QCardSection v-if="model">
            <form class="tw:flex tw:flex-wrap tw:gap-2">
                <InputText class="tw:w-[49%]" v-model="model.firstName" label="Nombre" />
                <InputText class="tw:w-[49%]" v-model="model.lastName" label="Apellido" />
                <InputText
                    :class="isCreate ? 'tw:w-[49%]' : 'tw:w-full'"
                    v-model="model.email"
                    label="Correo"
                />
                <!-- Not show when is creating user -->
                <SelectUserStatuses
                    v-if="!isCreate"
                    v-model="model.statusId"
                    class="tw:w-[49%]"
                />
                <SelectUserRoles v-model="model.roleId" class="tw:w-[49%]" />
            </form>
        </QCardSection>
        <QCardSection> <H6>Organizationes</H6> </QCardSection>
        <QSeparator />
        <QCardSection>
            <InputSelect
                label="Buscar"
                v-model="userOrgs"
                :options="orgsStore.organizations"
                key-label="name"
                key-value="id"
                multiple
                :emit-value="false"
                :loading="userOrgs?.length === 0 && !isCreate"
            />
        </QCardSection>
        <QCardActions align="right">
            <ButtonCancel @click="onCancel" :disabled="loading" />
            <ButtonSave
                v-if="isCreate"
                @click="onCreate"
                :disabled="disabledAction"
                :loading="loading"
            />
            <ButtonUpdate
                v-else
                @click="onSave"
                :disabled="disabledAction"
                :loading="loading"
            />
        </QCardActions>
    </QCard>
</template>
