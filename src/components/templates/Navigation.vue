<script setup lang="ts">
import { ROUTES } from '@constants/routes';
import {
    QLayout,
    QDrawer,
    QList,
    QItem,
    QItemSection,
    QPageContainer,
    QTooltip,
    QSeparator,
    QPopupProxy,
} from 'quasar';
import type { Component } from 'vue';
import { useRoute } from 'vue-router';
import type { TIcon } from '@atoms/Icons/type';
import IconDashboard from '@atoms/Icons/IconDashboard.vue';
import IconShield from '@atoms/Icons/IconShield.vue';
import IconCalendar from '@atoms/Icons/IconCalendar.vue';
import { useThemeStore } from '@storages/stores/theme';
import IconSun from '@atoms/Icons/IconSun.vue';
import IconMoon from '@atoms/Icons/IconMoon.vue';
import { computed, onMounted, ref } from 'vue';
import ButtonSecondary from '@atoms/Buttons/ButtonSecondary.vue';
import { useOrganizationsStore } from '@storages/stores/organizations';
import { storeToRefs } from 'pinia';
import H6 from '@atoms/Typography/H6.vue';
import type { OrganizationDOM } from '@modules/organizations/domain/entities/organization';
import { servicesTenants } from '@services/tenants';
import { useSessionStore } from '@storages/stores/session';
import type { TenantDOM } from '@modules/tenants/domain/entities/tenant';
import { handleResponse } from '@helpers/handle_response';
import IconSettings from '@atoms/Icons/IconSettings.vue';
import MainContent from './MainContent.vue';

type TMenu = {
    label: string;
    title?: string;
    href: ROUTES;
    icon: Component<TIcon>;
};

const MENUS: TMenu[] = [
    {
        label: 'Dashboard',
        href: ROUTES.DASHBOARD,
        icon: IconDashboard,
    },
    {
        label: 'Auditorias',
        href: ROUTES.AUDITS,
        icon: IconShield,
    },
    {
        label: 'Calendario',
        href: ROUTES.CALENDAR,
        icon: IconCalendar,
    },
    {
        label: 'Ajustes',
        title: 'Información de la cuenta',
        href: ROUTES.SETTINGS_GENERAL,
        icon: IconSettings,
    },
];

const route = useRoute();
const themeStore = useThemeStore();
const sessionStore = useSessionStore();
const { orgSelect, organizations } = storeToRefs(useOrganizationsStore());

const tenant = ref<TenantDOM>();
const showMenu = ref(true);
const showOrgs = ref(false);

const menuSelected = computed(() => MENUS.find(({ href }) => href === route.path));

onMounted(async () => {
    const result = await servicesTenants.getById(sessionStore.get().user.tenantId);

    handleResponse(result, {
        error(_) {},
        success(data) {
            tenant.value = data.item;
        },
    });
});

const handleSelectOrg = (org: OrganizationDOM) => {
    orgSelect.value = org;
    showOrgs.value = false;
};
</script>

<template>
    <QLayout view="hhh LpR fFf">
        <QDrawer
            v-model="showMenu"
            side="left"
            behavior="desktop"
            bordered
            mini
            class="tw:flex tw:flex-col tw:justify-between tw:py-1"
        >
            <QList>
                <QItem>
                    <ButtonSecondary>
                        {{ orgSelect?.name[0]?.toUpperCase() }}
                        <QPopupProxy
                            v-model="showOrgs"
                            anchor="center left"
                            self="center right"
                            :offset="[10, 1000]"
                            class="tw:max-w-none! tw:max-h-none! tw:p-2  tw:top-3! tw:z-10000!"
                        >
                            <H6>{{ tenant?.name }}</H6>
                            <QSeparator />
                            <QList class="tw:mt-2">
                                <template v-for="org in organizations" :key="org.id">
                                    <QItem
                                        clickable
                                        :active="orgSelect?.id === org.id"
                                        v-ripple
                                        @click="() => handleSelectOrg(org)"
                                    >
                                        <QItemSection> {{ org.name }} </QItemSection>
                                    </QItem>
                                </template>
                            </QList>
                        </QPopupProxy>
                        <QTooltip anchor="center left" self="center right">
                            <p class="tw:text-body">{{ orgSelect?.name }}</p>
                        </QTooltip>
                    </ButtonSecondary>
                </QItem>
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
            <QList>
                <QItem clickable v-ripple> profile </QItem>
                <QItem clickable v-ripple @click="themeStore.toggle">
                    <QItemSection avatar>
                        <IconSun v-if="themeStore.isDark" />
                        <IconMoon v-else />
                    </QItemSection>
                </QItem>
                <QItem> <img src="/favicon.ico" alt="ico" class="tw:max-w-9"> </QItem>
            </QList>
        </QDrawer>

        <QPageContainer>
            <template v-if="route.path.includes(ROUTES.SETTINGS)"> <slot /> </template>
            <MainContent v-else :title="menuSelected?.title || menuSelected?.label">
                <slot />
            </MainContent>
        </QPageContainer>
    </QLayout>
</template>
