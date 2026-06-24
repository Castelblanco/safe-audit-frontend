import { handleResponse } from '@helpers/handle_response';
import type { TenantDOM } from '@modules/tenants/domain/entities/tenant';
import { servicesTenants } from '@services/tenants';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useSessionStore } from './session';

export const useTenantStore = defineStore('tenant-store', () => {
    const session = useSessionStore();
    const tenant = ref<TenantDOM>();

    const init = async () => {
        if (tenant.value) return;
        const result = await servicesTenants.getById(session.get().user.tenantId);
        handleResponse(result, {
            error(_) {},
            success(data) {
                tenant.value = data.item;
            },
        });
    };

    return {
        tenant,
        init,
    };
});
