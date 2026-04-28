export const enum STATUS_SUBSCRIPTION {
    TRIAL = 1,
    ACTIVE = 2,
    PAST_DUE = 3,
    CANCELED = 4,
    EXPIRED = 5,
}

export const enum STATUS_USER {
    INVITED = 0,
    INVITATION_DECLINED = 1,
    ACTIVE = 2,
    INACTIVE = 3,
}

export const enum STATUS_AUDIT {
    DRAFT = 0,
    SCHEDULED = 1,
    IN_PROGRESS = 2,
    COMPLETED = 3,
    CANCELED = 4,
}

export const enum STATUS_FINDING {
    OPEN = 0,
    IN_PROGRESS = 1,
    RESOLVED = 2,
    CLOSED = 3,
}

export const enum STATUS_ACTION {
    PENDING = 0,
    IN_PROGRESS = 1,
    COMPLETED = 2,
}
