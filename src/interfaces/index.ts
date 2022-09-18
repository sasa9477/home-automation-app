import { Log, Prisma, Switcher } from '@prisma/client';

export type SwitcherGetRequest = {};
export type SwitcherGetResponse = Switcher[] & {};

export type SwitcherCreateRequest = Omit<Switcher, 'id' | 'createdAt' | 'updatedAt'>;
export type SwitcherCreateResponse = {};

export type SwitcherUpdateRequest = Pick<Switcher, 'id'> & Partial<Switcher>;
export type SwitcherUpdateResponse = {};

export type SwitcherDeleteRequest = {
  id: number;
};
export type SwitcherDeleteResponse = {};

export type LogCreateRequest = Omit<Log, 'id' | 'createdAt'>;
export type LogCreateResponse = {};
