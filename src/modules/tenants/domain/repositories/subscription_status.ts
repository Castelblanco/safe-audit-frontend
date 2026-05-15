import type { TAllOperations } from '@common/types/operations';
import type {
    SubscriptionStatusDOM,
    TSubscriptionStatusFDOM,
} from '../entities/subscription_status';

export type TSubscriptionStatusRepository = TAllOperations<
    SubscriptionStatusDOM,
    TSubscriptionStatusFDOM
>;
