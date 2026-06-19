v.<script setup lang="ts">
import { FORMATS_DATE } from '@constants/formats';
import { handleResponse } from '@helpers/handle_response';
import type { AuditDOM, TAuditFDOM } from '@modules/audits/domain/entities/audit';
import { servicesAudit } from '@services/audit';
import { snackbarStore } from '@storages/stores/snackbar';
import { datetimeTool } from '@tools/datetime';
import { QMarkupTable, QPagination, QTable, QTd, QTh, type QTableProps } from 'quasar';
import { computed, onMounted, ref, watch } from 'vue';
import AuditStatus from './AuditStatus.vue';
import AuditType from './AuditType.vue';
import { useRouter } from 'vue-router';
import { ROUTES } from '@constants/routes';
import { DISPLAY_NOT_CONTENT } from '@constants/displays';

const LIMIT = 50;
const router = useRouter();

const audits = ref<AuditDOM[]>([]);
const filters = ref<TAuditFDOM>({
    limit: LIMIT,
    offset: 0,
});
const total = ref(0);
const currentPage = ref(1);
const loading = ref(false);

const totalPages = computed(() => Math.ceil(total.value / LIMIT));
onMounted(() => getAudits());
watch(filters, () => getAudits());

const getAudits = async () => {
    loading.value = true;
    const result = await servicesAudit.getAll(filters.value);
    handleResponse(result, {
        error(_) {
            snackbarStore.error('Error cargado datos');
        },
        success(data) {
            audits.value = data.items;
            total.value = data.total;
        },
    });
    loading.value = false;
};

const handleSelect = (audit: AuditDOM) => {
    router.push(`${ROUTES.AUDITS}/${audit.id}`);
};
</script>

<template>
    <div>
        <QMarkupTable class="tw:text-left">
            <thead>
                <tr>
                    <th colspan="5">
                        <h6>Auditorias</h6>
                    </th>
                </tr>
                <tr>
                    <th class="tw:text-body! tw:font-semibold!">Titulo</th>
                    <th class="tw:text-body! tw:font-semibold!">Estado</th>
                    <th class="tw:text-body! tw:font-semibold!">Tipo</th>
                    <th class="tw:text-body! tw:font-semibold!">Empieza el</th>
                    <th class="tw:text-body! tw:font-semibold!">Termina el</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="audit in audits"
                    :key="audit.id"
                    @click="() => handleSelect(audit)"
                    class="tw:cursor-pointer"
                >
                    <td class="tw:text-body">{{ audit.title }}</td>
                    <td class="tw:text-body">
                        <AuditStatus :statusId="audit.statusId" />
                    </td>
                    <td class="tw:text-body"><AuditType :typeId="audit.typeId" /></td>
                    <template v-if="audit.startDate">
                        <td class="tw:text-body">
                            {{ datetimeTool.formatToText(audit.startDate, FORMATS_DATE.DATETIME) }}
                        </td>
                    </template>
                    <template v-else>
                        <td class="tw:text-body">{{ DISPLAY_NOT_CONTENT.NOT_SET }}</td>
                    </template>
                    <template v-if="audit.endDate">
                        <td class="tw:text-body">
                            {{ datetimeTool.formatToText(audit.endDate, FORMATS_DATE.DATETIME) }}
                        </td>
                    </template>
                    <template v-else>
                        <td class="tw:text-body">{{ DISPLAY_NOT_CONTENT.NOT_SET }}</td>
                    </template>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="5">
                        <QPagination
                            class="tw:flex tw:justify-center tw:w-full"
                            v-model="currentPage"
                            :max="totalPages"
                            :max-pages="6"
                        />
                    </td>
                </tr>
            </tfoot>
        </QMarkupTable>
    </div>
</template>
