import axios from 'axios';
import useSWR from 'swr';

import type { LogGetResponse } from '../pages/api/log/get';
import type { SwitcherGetResponse } from '../pages/api/switcher/get';
import type { SwitcherDeleteRequest, SwitcherDeleteResponse } from '../pages/api/switcher/delete/[id]';
import type { SwitcherCreateRequest, SwitcherCreateResponse } from '../pages/api/switcher/post';
import type { SwitcherUpdateRequest, SwitcherUpdateResponse } from '../pages/api/switcher/patch';

const apiClient = {
  switcher: {
    create: (req: SwitcherCreateRequest) => axios.post<SwitcherCreateResponse>('/api/switcher/post', req),
    update: (req: SwitcherUpdateRequest) => axios.patch<SwitcherUpdateResponse>('/api/switcher/patch', req),
    delete: (req: SwitcherDeleteRequest) => axios.delete<SwitcherDeleteResponse>(`/api/switcher/delete/${req.id}`),
  },
};

export default apiClient;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useSwitcherSWR = () => {
  const { data, error, mutate } = useSWR<SwitcherGetResponse>('/api/switcher/get', fetcher);
  return {
    isLoading: !error && !data,
    switchers: data,
    error,
    mutate,
  };
};

export const useLogSWR = () => {
  const { data, error, mutate } = useSWR<LogGetResponse>('/api/log/get', fetcher);
  return {
    isLoading: !error && !data,
    data,
    error,
    mutate,
  };
};
