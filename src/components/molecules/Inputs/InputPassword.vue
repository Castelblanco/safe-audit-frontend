<script setup lang="ts">
import IconButton from '@atoms/Buttons/IconButton.vue';
import IconNotVisibility from '@atoms/Icons/IconNotVisibility.vue';
import IconVisibility from '@atoms/Icons/IconVisibility.vue';
import InputText, { type TInputTextProps } from '@atoms/Inputs/InputText.vue';
import { ref } from 'vue';

export type TInputPassword = TInputTextProps;
const model = defineModel<string>();
const props = defineProps<TInputPassword>();

const show = ref(false);
</script>

<template>
    <InputText v-model="model" v-bind="props" :type="show ? 'text' : 'password'">
        <template v-slot:append>
            <IconButton @click="show = !show">
                <IconVisibility v-if="show" />
                <IconNotVisibility v-else />
            </IconButton>
        </template>
    </InputText>
</template>
