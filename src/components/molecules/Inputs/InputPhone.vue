<script setup lang="ts">
import InputText from '@atoms/Inputs/InputText.vue';
import { QSelect, QItem, QItemSection, QItemLabel } from 'quasar';
import countryCodes from '@constants/country_codes.json';

type TCountryCode = {
    code: string;
    name: string;
    cca2: string;
    flag: string;
};

const COUNTRIES = countryCodes as TCountryCode[];

const phone = defineModel<string>('phone');
const countryCode = defineModel<string>('countryCode');

defineProps<{
    phoneLabel?: string;
    codeLabel?: string;
}>();
</script>

<template>
    <div class="tw:flex tw:gap-2">
        <QSelect
            v-model="countryCode"
            :options="COUNTRIES"
            option-label="code"
            option-value="code"
            emit-value
            map-options
            outlined
            :label="codeLabel || 'Codigo'"
            class="tw:w-1/3"
        >
            <template #option="scope">
                <QItem v-bind="scope.itemProps">
                    <QItemSection avatar>
                        <img
                            :src="scope.opt.flag"
                            :alt="scope.opt.cca2"
                            class="tw:w-6 tw:h-4 tw:object-cover tw:rounded-sm"
                        >
                    </QItemSection>
                    <QItemSection>
                        <QItemLabel>{{ scope.opt.code }}</QItemLabel>
                        <QItemLabel caption>{{ scope.opt.name }}</QItemLabel>
                    </QItemSection>
                </QItem>
            </template>
        </QSelect>
        <InputText
            v-model="phone"
            :label="phoneLabel || 'Telefono'"
            type="number"
            class="tw:w-2/3 no-spin"
        />
    </div>
</template>

<style>
.no-spin input[type='number'] {
    -moz-appearance: textfield;
}
.no-spin input::-webkit-outer-spin-button,
.no-spin input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
