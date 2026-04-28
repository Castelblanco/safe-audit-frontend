import type { ROUTES } from '@constants/routes';
import { defineStore } from 'pinia';
import { ref } from 'vue';

type TRoutes = Record<ROUTES, AbortController[]>;

class AbortControllerManager {
    private controllers: Map<ROUTES, AbortController[]> = new Map();
    private currentRoute: ROUTES | null = null;

    setCurrentRoute(route: ROUTES) {
        this.currentRoute = route;
    }

    add(controller: AbortController): number {
        if (!this.currentRoute) {
            throw new Error('No current route set');
        }
        const existing = this.controllers.get(this.currentRoute) || [];
        const index = existing.length;
        this.controllers.set(this.currentRoute, [...existing, controller]);
        return index;
    }

    remove(index: number): void {
        if (!this.currentRoute) return;
        const controllers = this.controllers.get(this.currentRoute);
        if (controllers) {
            controllers.splice(index, 1);
            if (controllers.length === 0) {
                this.controllers.delete(this.currentRoute);
            }
        }
    }

    abortAll(route?: ROUTES): void {
        const targetRoute = route || this.currentRoute;
        if (!targetRoute) return;

        const controllers = this.controllers.get(targetRoute);
        if (controllers) {
            controllers.forEach((c) => void c.abort());
            this.controllers.delete(targetRoute);
        }
    }
}

export const abortManager = new AbortControllerManager();

export const useAbortControllerStore = defineStore('abort-controller-store', () => {
    const ctrlsPage = ref<Partial<TRoutes>>({});

    const add = (route: ROUTES, ...controllers: AbortController[]) => {
        if (!ctrlsPage.value[route]) ctrlsPage.value[route] = [];
        return ctrlsPage.value[route].push(...controllers);
    };

    const removeByIndex = (route: ROUTES, index: number) => {
        ctrlsPage.value[route]?.splice(index, 1);
    };

    const remove = (route: ROUTES) => (ctrlsPage.value[route] = []);

    const abort = (route: ROUTES) => {
        ctrlsPage.value[route]?.forEach((controller) => {
            controller.abort('CANCEL');
        });
        remove(route);
    };

    return {
        value: ctrlsPage,
        add,
        removeByIndex,
        remove,
        abort,
    };
});
