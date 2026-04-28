import { handleResponse } from '@helpers/handle_response';
import type { AuditStatusDOM } from '@modules/audits/domain/entities/audit_status';
import type { AuditTypeDOM } from '@modules/audits/domain/entities/audit_type';
import { servicesAudit } from '@services/audit';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuditsStore = defineStore('audits-store', () => {
    const statuses = ref<AuditStatusDOM[]>([]);
    const types = ref<AuditTypeDOM[]>([]);

    const getTypes = async () => {
        if (types.value.length > 0) return;
        const result = await servicesAudit.getTypes({});
        handleResponse(result, {
            error(_) {},
            success: ({ items }) => {
                types.value = items;
            },
        });
    };

    const getStatuses = async () => {
        if (statuses.value.length > 0) return;
        const result = await servicesAudit.getStatuses({});
        handleResponse(result, {
            error(_) {},
            success: ({ items }) => {
                statuses.value = items;
            },
        });
    };

    const init = async () => {
        await Promise.all([getStatuses(), getTypes()]);
    };

    return {
        types,
        statuses,
        init,
    };
});
