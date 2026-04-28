import { createRouter, createWebHistory } from 'vue-router';
import LayoutMain from '@layouts/LayoutMain.vue';
import { ROUTES } from './constants/routes';
import LayoutApp from './components/layouts/LayoutApp.vue';

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
                    ],
                },
            ],
        },
    ],
});
