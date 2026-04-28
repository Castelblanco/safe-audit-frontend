import { Notify } from 'quasar';

const DURATION = 5000;

export class SnackbarStore {
    success = (message: string) => {
        Notify.create({
            type: "positive",
            message,
            timeout: DURATION,
            progress: true,
        })
    };

    warning = (message: string) => {
        Notify.create({
            type: "warning",
            message,
            timeout: DURATION,
            progress: true,
        })
    };

    error = (message: string) => {
        Notify.create({
            type: "negative",
            message,
            timeout: DURATION,
            progress: true,
        })
    };
}

export const snackbarStore = new SnackbarStore();