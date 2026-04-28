import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import { quasar } from '@quasar/vite-plugin';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx(), vueDevTools(), tailwindcss(), quasar()],
    resolve: {
        alias: {
            '@/': fileURLToPath(new URL('./src/', import.meta.url)),
            '@atoms': fileURLToPath(new URL('./src/components/atoms', import.meta.url)),
            '@molecules': fileURLToPath(new URL('./src/components/molecules', import.meta.url)),
            '@organisms': fileURLToPath(new URL('./src/components/organisms', import.meta.url)),
            '@templates': fileURLToPath(new URL('./src/components/templates', import.meta.url)),
            '@layouts': fileURLToPath(new URL('./src/components/layouts', import.meta.url)),
            '@pages': fileURLToPath(new URL('./src/components/pages', import.meta.url)),
            '@services': fileURLToPath(new URL('./src/infrastructure/services', import.meta.url)),
            '@storages': fileURLToPath(new URL('./src/infrastructure/storages', import.meta.url)),
            '@helpers': fileURLToPath(new URL('./src/infrastructure/helpers', import.meta.url)),
            '@tools': fileURLToPath(new URL('./src/infrastructure/tools', import.meta.url)),
            '@constants': fileURLToPath(new URL('./src/constants', import.meta.url)),
            '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
            '@common': fileURLToPath(new URL('./src/modules/common', import.meta.url)),
        },
    },
});
