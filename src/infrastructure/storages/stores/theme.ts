import { loadTheme, type TTheme } from '@helpers/load_theme';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useQuasar } from 'quasar';

export const useThemeStore = defineStore('theme-store', () => {
    const theme = ref<TTheme>(loadTheme());
    const isDark = computed(() => theme.value === "dark");
    const $q = useQuasar();

    watch(theme, () => {
        if (theme.value === null) return;
        $q.dark.set(theme.value === 'dark');
        // document.documentElement.setAttribute('data-mode', theme.value);
        localStorage.setItem('app-theme', theme.value);
    });

    const toggle = () => {
        theme.value = theme.value === 'dark' ? 'light' : 'dark';
    };

    return {
        value: theme,
        isDark,
        toggle,
    };
});
