import type { TSessionRepository } from '../domain/repositories/session';

type TDependencies = {
    sessionRepo: TSessionRepository;
};

export const buildLogin = ({ sessionRepo }: TDependencies) => {
    const execute = async (email: string, password: string) => {
        return await sessionRepo.create(email, password);
    };
    return execute;
};
