<script setup lang="ts">
import IconButton from '@atoms/Buttons/IconButton.vue';
import IconMenu from '@atoms/Icons/IconMenu.vue';
import { ROUTES } from '@constants/routes';
import {
    QLayout,
    QHeader,
    QToolbar,
    QDrawer,
    QList,
    QItem,
    QItemSection,
    QPageContainer,
    QToolbarTitle,
} from 'quasar';
import { ref, type Component } from 'vue';
import { useRoute } from 'vue-router';
import { APP_NAME, APP_VERSION } from '@constants/app';
import type { TIcon } from '@atoms/Icons/type';
import IconDashboard from '@atoms/Icons/IconDashboard.vue';
import IconShield from '@atoms/Icons/IconShield.vue';
import IconCalendar from '@atoms/Icons/IconCalendar.vue';
import { useThemeStore } from '@storages/stores/theme';
import IconSun from '@atoms/Icons/IconSun.vue';
import IconMoon from '@atoms/Icons/IconMoon.vue';

type TMenu = {
    label: string;
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
];

const route = useRoute();
const themeStore = useThemeStore();

const show = ref(false);
const toggleShow = () => (show.value = !show.value);
</script>

<template>
    <QLayout view="hhh LpR fFf">
        <QHeader elevated class="tw:py-1">
            <QToolbar>
                <IconButton @click="toggleShow"> <IconMenu :size="27" /> </IconButton>
                <QToolbarTitle>
                    <div class="tw:flex tw:items-center tw:h-full">
                        <p class="tw:text-2xl tw:m-0!">
                            {{ APP_NAME }}
                            <span class="tw:text-small">v{{ APP_VERSION }}</span>
                        </p>
                    </div>
                </QToolbarTitle>
                <div>
                    <IconButton @click="themeStore.toggle">
                        <IconSun v-if="themeStore.isDark" />
                        <IconMoon v-else />
                    </IconButton>
                </div>
            </QToolbar>
        </QHeader>

        <QDrawer v-model="show" side="left" behavior="mobile" bordered>
            <QList>
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
                    </QItem>
                </template>
            </QList>
        </QDrawer>

        <QPageContainer>
            <main class="tw:p-4"><slot /></main>
        </QPageContainer>
    </QLayout>
</template>
