<script setup lang="ts">
import { ROUTES } from '@constants/routes';
import { QList, QItem, QItemSection, QTooltip } from 'quasar';
import type { Component } from 'vue';
import { useRoute } from 'vue-router';
import type { TIcon } from '@atoms/Icons/type';
import { computed } from 'vue';
import IconAccount from '@atoms/Icons/IconAccount.vue';
import IconUsers from '@atoms/Icons/IconUsers.vue';
import IconOrganizations from '@atoms/Icons/IconOrganizations.vue';
import IconBilling from '@atoms/Icons/IconBilling.vue';
import MainContent from '@templates/MainContent.vue';

type TMenu = {
    label: string;
    href: ROUTES;
    icon: Component<TIcon>;
};

const MENUS: TMenu[] = [
    {
        label: 'Información de la cuenta',
        href: ROUTES.SETTINGS_GENERAL,
        icon: IconAccount,
    },
    {
        label: 'Usuarios',
        href: ROUTES.SETTINGS_USERS,
        icon: IconUsers,
    },
    {
        label: 'Organizaciones',
        href: ROUTES.SETTINGS_ORGANIZATIONS,
        icon: IconOrganizations,
    },
    {
        label: 'Facturación',
        href: ROUTES.SETTINGS_BILLING,
        icon: IconBilling,
    },
];

const route = useRoute();
const menuSelected = computed(() => MENUS.find(({ href }) => href === route.path));
</script>

<template>
    <div class="tw:flex tw:h-dvh">
        <QList class="tw:border-r">
            <template v-for="(menu, index) in MENUS" :key="index">
                <QItem
                    clickable
                    :active="route.path === menu.href"
                    v-ripple
                    :to="menu.href"
                >
                    <QItemSection avatar class="tw:min-w-0!">
                        <component :is="menu.icon" />
                    </QItemSection>
                    <QItemSection> {{ menu.label }} </QItemSection>
                    <QTooltip anchor="center left" self="center right">
                        <p class="tw:text-body">{{ menu.label }}</p>
                    </QTooltip>
                </QItem>
            </template>
        </QList>

        <MainContent :title="menuSelected?.label"> <RouterView /> </MainContent>
    </div>
</template>
