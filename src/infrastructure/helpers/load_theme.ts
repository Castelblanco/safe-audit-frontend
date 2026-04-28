export type TTheme = 'dark' | 'light' | null;

export const loadTheme = (): TTheme => {
    const theme = localStorage.getItem('mode') as 'light' | 'dark' | null;
    if (theme) return theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
};
