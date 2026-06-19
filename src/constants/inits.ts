import type { AuditDOM } from '@modules/audits/domain/entities/audit';
import { STATUS_AUDIT } from './status';
import type { UserDOM } from '@modules/users/domain/entities/user';
import type { OrganizationDOM } from '@modules/organizations/domain/entities/organization';

export const AUDIT_INIT: AuditDOM = {
    id: '',
    organizationId: '',
    tenantId: '',
    title: '',
    description: '',
    statusId: STATUS_AUDIT.DRAFT,
    typeId: null,
    startDate: null,
    endDate: null,
    auditorUserId: null,
    createdBy: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
};

export const USER_INIT: UserDOM = {
    id: '',
    tenantId: '',
    firstName: '',
    lastName: '',
    email: '',
    statusId: STATUS_AUDIT.DRAFT,
    roleId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
};

export const ORGANIZATION_INIT: OrganizationDOM = {
    id: '',
    tenantId: '',
    name: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
};
