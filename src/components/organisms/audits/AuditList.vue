v.<script setup lang="ts">
import { FORMATS_DATE } from '@constants/formats';
import { handleResponse } from '@helpers/handle_response';
import type { AuditDOM, TAuditFDOM } from '@modules/audits/domain/entities/audit';
import { servicesAudit } from '@services/audit';
import { snackbarStore } from '@storages/stores/snackbar';
import { datetimeTool } from '@tools/datetime';
import { QTable, QTd, QTh, type QTableProps } from 'quasar';
import { onMounted, ref, watch } from 'vue';
import AuditStatus from './AuditStatus.vue';
import AuditType from './AuditType.vue';
import { useRouter } from 'vue-router';
import { ROUTES } from '@constants/routes';

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

const columns: QTableProps['columns'] = [
    {
        name: 'title',
        label: 'Titulo',
        field: 'title',
        align: 'left',
    },
    {
        name: 'status',
        label: 'Estado',
        field: 'statusId',
        align: 'left',
    },
    {
        name: 'type',
        label: 'Tipo',
        field: 'typeId',
        align: 'left',
    },
    {
        name: 'startDate',
        label: 'Empieza el',
        field: 'startDate',
        align: 'left',
        format: (v: Date) => datetimeTool.formatToText(v, FORMATS_DATE.DATETIME),
    },
    {
        name: 'endDate',
        label: 'Termina el',
        field: 'endDate',
        align: 'left',
        format: (v: Date) => datetimeTool.formatToText(v, FORMATS_DATE.DATETIME),
    },
];

const handleSelect = (_: Event, audit: AuditDOM) => {
    router.push(`${ROUTES.AUDITS}/${audit.id}`);
};
</script>

<template>
    <div>
        <QTable
            title="Auditorias"
            :loading="loading"
            :columns="columns"
            :rows="audits"
            row-key="title"
            @row-click="handleSelect"
        >
            <template v-slot:header-cell="props">
                <QTh :props="props" class="tw:text-body tw:font-semibold">
                    {{ props.col.label }}
                </QTh>
            </template>
            <template v-slot:body-cell="props">
                <QTd :props="props" class="tw:text-body"> {{ props.value }} </QTd>
            </template>
            <template v-slot:body-cell-type="props">
                <QTd :props="props"> <AuditType :typeId="props.value" /> </QTd>
            </template>
            <template v-slot:body-cell-status="props">
                <QTd :props="props"> <AuditStatus :statusId="props.value" /> </QTd>
            </template>
        </QTable>
    </div>
</template>
