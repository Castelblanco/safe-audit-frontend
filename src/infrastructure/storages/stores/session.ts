import { ROUTES } from '@constants/routes';
import type { SessionDOM } from '@modules/auth/domain/entities/session';
import { datetimeTool } from '@tools/datetime';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const KEY = 'app-session';
export const useSessionStore = defineStore('session-store', () => {
    const session = ref<SessionDOM | undefined>();
    const router = useRouter();

    watch(session, async () => {
        if (session.value) {
            return cookieStore.set({
                name: KEY,
                value: JSON.stringify(session.value),
                sameSite: 'strict',
                // One month
                expires: datetimeTool.toMillis(datetimeTool.plus(datetimeTool.now(), 'days', 30)),
            });
        }

        cookieStore.delete(KEY);
        return router.replace(ROUTES.LOGIN);
    });

    cookieStore.addEventListener('change', (e) => {
        const cookie = e.deleted.find(({ name }) => name === KEY);
        // If our cookie not is deleted,
        if (!cookie) return;
        router.replace(ROUTES.LOGIN);
    });

    (async () => {
        const result = await cookieStore.get(KEY);
        if (!result?.value) return router.replace(ROUTES.LOGIN);
        session.value = JSON.parse(result.value) as SessionDOM;
    })();

    const get = () => {
        if (session.value) return session.value;
        throw router.replace(ROUTES.LOGIN);
    };
    const clear = () => (session.value = undefined);

    return {
        value: session,
        get,
        clear,
    };
});
