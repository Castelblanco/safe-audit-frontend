import type { ROUTES } from '@constants/routes';

export type TButton = {
    href?: ROUTES;
    onClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button';
};
