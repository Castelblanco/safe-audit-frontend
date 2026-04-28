<script setup lang="ts">
import ButtonPrimary from '@/components/atoms/Buttons/ButtonPrimary.vue';
import InputText from '@/components/atoms/Inputs/InputText.vue';
import H1 from '@/components/atoms/Typography/H1.vue';
import { ROUTES } from '@constants/routes';
import { handleResponse } from '@helpers/handle_response';
import { servicesSession } from '@services/session';
import { useSessionStore } from '@storages/stores/session';
import { snackbarStore } from '@storages/stores/snackbar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const sessionStore = useSessionStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const loading = ref(false);

const handleLogin = async () => {
    loading.value = true;
    const result = await servicesSession.login(email.value, password.value);
    handleResponse(result, {
        success(data) {
            sessionStore.value = data.item;
            router.replace(ROUTES.DASHBOARD);
        },
        error(error) {
            snackbarStore.success('Error');
        },
    });
    loading.value = false;
};
</script>

<template>
    <div class="tw:flex tw:justify-center tw:items-center tw:h-screen">
        <q-card>
            <q-card-section>
                <H1>Iniciar Sesion</H1>

                <form
                    class="tw:flex tw:flex-col tw:items-center tw:gap-5 tw:mt-5"
                    @submit.prevent="handleLogin"
                >
                    <InputText
                        v-model="email"
                        class="tw:w-full"
                        label="correo"
                        name="email"
                        au
                    />
                    <InputText
                        v-model="password"
                        class="tw:w-full"
                        label="contraseña"
                        type="password"
                        name="password"
                    />
                    <ButtonPrimary type="submit" :loading="loading">
                        Iniciar Sesion
                    </ButtonPrimary>
                </form>
            </q-card-section>
        </q-card>
    </div>
</template>
