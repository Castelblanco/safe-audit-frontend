import { ROUTES } from '@constants/routes';
import { handleResponse } from '@helpers/handle_response';
import type { OrganizationDOM } from '@modules/organizations/domain/entities/organization';
import { servicesOrganizations } from '@services/organizations';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useSessionStore } from './session';

const LAST_ORG_KEY = 'last-org-id';

export const useOrganizationsStore = defineStore('organizations-store', () => {
    const session = useSessionStore();
    const router = useRouter();
    const organizations = ref<OrganizationDOM[]>([]);
    const orgSelect = ref<OrganizationDOM>();
    const lastOrgId = ref<string>();

    // Change org select and last org
    watch(organizations, () => {
        if (organizations.value.length === 0) return;
        let orgFind = organizations.value.find((org) => org.id === lastOrgId.value);
        if (!orgFind) orgFind = organizations.value[0];
        orgSelect.value = orgFind;
        lastOrgId.value = orgFind?.id;
    });

    // save last org in
    watch(orgSelect, () => {
        if (!orgSelect.value) return;
        localStorage.setItem(LAST_ORG_KEY, orgSelect.value.id);
    });

    const init = async () => {
        if (organizations.value.length > 0) return;
        const result = await servicesOrganizations.getByUser(session.get().user.id);
        handleResponse(result, {
            error(_) {},
            success(data) {
                organizations.value = data.items;
            },
        });
    };

    const get = () => {
        if (orgSelect.value) return orgSelect.value;
        throw router.replace(ROUTES.LOGIN);
    };

    return {
        organizations,
        orgSelect,
        get,
        init,
    };
});
