import { buildLogin } from '@modules/auth/services';
import { SessionHttpRepo } from '@storages/http/implementations/sessions/repository';

const sessionRepo = new SessionHttpRepo();

export const servicesSession = {
    login: buildLogin({ sessionRepo }),
};
