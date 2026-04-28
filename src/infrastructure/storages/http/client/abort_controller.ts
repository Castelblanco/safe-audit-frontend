import { abortManager } from '@storages/stores/abort_controllers';

export const withAbortController = <T>(
    request: (controller: AbortController) => Promise<T>,
): Promise<T> => {
    const controller = new AbortController();
    const index = abortManager.add(controller);
    return request(controller).finally(() => {
        abortManager.remove(index);
    });
};
