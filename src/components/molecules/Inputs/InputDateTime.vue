<script setup lang="ts">
import ButtonPrimary from '@atoms/Buttons/ButtonPrimary.vue';
import IconButton from '@atoms/Buttons/IconButton.vue';
import IconCalendar from '@atoms/Icons/IconCalendar.vue';
import IconClock from '@atoms/Icons/IconClock.vue';
import { FORMATS_DATE } from '@constants/formats';
import { datetimeTool } from '@tools/datetime';
import { QDate, QInput, QPopupProxy, QTime } from 'quasar';
import { ref, watch } from 'vue';

export type TInputDate = {
    format?: FORMATS_DATE;
    label?: string;
};

const QDATEFORMAT: Record<FORMATS_DATE, string> = {
    [FORMATS_DATE.DATE]: 'YYYY-MM-DD',
    [FORMATS_DATE.DATETIME]: 'YYYY-MM-DD HH:mm',
};

const model = defineModel<Date | undefined | null>();
const { format = FORMATS_DATE.DATETIME, ...props } = defineProps<TInputDate>();
const date = ref(!model.value ? '' : datetimeTool.formatToText(model.value, format));
watch(date, () => {
    if (!date.value) return (model.value = null);
    model.value = new Date(date.value);
});
const formatSelect = QDATEFORMAT[format];
</script>

<template>
    <QInput v-bind="props" outlined v-model="date">
        <template v-slot:prepend>
            <IconButton>
                <IconCalendar />
                <QPopupProxy transition-show="scale" transition-hide="scale">
                    <QDate v-model="date" :mask="formatSelect">
                        <div class="tw:flex tw:justify-end">
                            <ButtonPrimary v-close-popup> Aceptar </ButtonPrimary>
                        </div>
                    </QDate>
                </QPopupProxy>
            </IconButton>
        </template>
        <template v-slot:append>
            <IconButton>
                <IconClock />
                <QPopupProxy transition-show="scale" transition-hide="scale">
                    <QTime v-model="date" :mask="formatSelect" format24h>
                        <div class="tw:flex tw:justify-end">
                            <ButtonPrimary v-close-popup> Aceptar </ButtonPrimary>
                        </div>
                    </QTime>
                </QPopupProxy>
            </IconButton>
        </template>
    </QInput>
</template>
