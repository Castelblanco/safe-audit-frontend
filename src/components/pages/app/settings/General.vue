<script setup lang="ts">
import InputText from '@atoms/Inputs/InputText.vue';
import { handleResponse } from '@helpers/handle_response';
import ButtonUpdate from '@molecules/Buttons/ButtonUpdate.vue';
import InputPhone from '@molecules/Inputs/InputPhone.vue';
import { servicesTenants } from '@services/tenants';
import { snackbarStore } from '@storages/stores/snackbar';
import { useTenantStore } from '@storages/stores/tenant';
import { computed, ref, toRaw, watch } from 'vue';
import { storeToRefs } from 'pinia';

const { tenant } = storeToRefs(useTenantStore());
const loading = ref(false);
let tenantSnapshot = '';

watch(
    () => tenant.value,
    (value) => {
        tenantSnapshot = JSON.stringify(toRaw(value));
    },
);

const disabledAction = computed(() => {
    console.log(tenant.value);

    return tenantSnapshot === JSON.stringify(toRaw(tenant.value));
});

const handleSave = async () => {
    if (!tenant.value) return;
    loading.value = true;
    const result = await servicesTenants.update(tenant.value.id, {
        name: tenant.value.name,
        email: tenant.value.email,
        phone: tenant.value.phone,
        countryCode: tenant.value.countryCode,
    });
    handleResponse(result, {
        success(data) {
            tenant.value = data.item;
            snackbarStore.success('Informacion de la cuenta actualizada');
        },
        error() {
            snackbarStore.error('Error actualizando la informacion');
        },
    });
    loading.value = false;
};
</script>

<template>
    <div v-if="tenant" class="tw:flex tw:flex-col tw:gap-4 tw:max-w-md">
        <InputText v-model="tenant.name" label="Nombre" />
        <InputText v-model="tenant.email" label="Email" />
        <InputPhone
            v-model:phone="tenant.phone"
            v-model:country-code="tenant.countryCode"
        />
        <div>
            <ButtonUpdate
                :disabled="disabledAction"
                :loading="loading"
                @click="handleSave"
            />
        </div>
    </div>
    <div v-else class="tw:text-gray-500">Cargando informacion...</div>
</template>
