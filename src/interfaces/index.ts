import { Prisma, Switcher } from '@prisma/client';

export type SwitcherCreateRequest = Omit<Switcher, 'id' | 'enabled'>;

export type SwitcherCreateResponse = {};

export type SwitcherUpdateRequest = Pick<Switcher, 'id'> & Partial<Switcher>;
export type SwitcherUpdateResponse = {};

export type SwitcherDeleteRequest = {
  id: number;
};
export type SwitcherDeleteResponse = {};

export type LogCreateRequest = {
  message: string;
};
export type LogCreateResponse = {};
