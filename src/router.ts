import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES } from './constants/routes';
import LayoutMain from '@layouts/LayoutMain.vue';
import LayoutApp from './components/layouts/LayoutApp.vue';
import LayoutSettings from '@layouts/LayoutSettings.vue';

export const appRouter = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: ROUTES.INDEX,
            component: LayoutMain,
            children: [
                {
                    path: ROUTES.INDEX,
                    component: () => import('@pages/Index.vue'),
                },
                {
                    path: ROUTES.LOGIN,
                    component: () => import('@pages/auth/Login.vue'),
                },
                // APP
                {
                    path: ROUTES.APP,
                    component: LayoutApp,
                    children: [
                        {
                            path: ROUTES.DASHBOARD,
                            component: () => import('@pages/app/Dashboard.vue'),
                        },
                        // Audits
                        {
                            path: ROUTES.AUDITS,
                            component: () => import('@pages/app/audits/List.vue'),
                        },
                        {
                            path: `${ROUTES.AUDITS}/:id`,
                            component: () => import('@pages/app/audits/Detail.vue'),
                        },
                        {
                            path: `${ROUTES.AUDIT_CREATE}`,
                            component: () => import('@pages/app/audits/Create.vue'),
                        },
                        // Calendar
                        {
                            path: `${ROUTES.CALENDAR}`,
                            component: () => import('@pages/app/Calendar.vue'),
                        },
                        // Settings
                        {
                            path: ROUTES.SETTINGS,
                            component: LayoutSettings,
                            children: [
                                {
                                    path: ROUTES.SETTINGS_GENERAL,
                                    component: () => import('@pages/app/settings/General.vue'),
                                },
                                {
                                    path: ROUTES.SETTINGS_USERS,
                                    component: () => import('@pages/app/settings/Users.vue'),
                                },
                                {
                                    path: ROUTES.SETTINGS_ORGANIZATIONS,
                                    component: () =>
                                        import('@pages/app/settings/Organizations.vue'),
                                },
                                {
                                    path: ROUTES.SETTINGS_BILLING,
                                    component: () => import('@pages/app/settings/Billing.vue'),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
});
