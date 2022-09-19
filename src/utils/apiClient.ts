import axios from 'axios';
import useSWR from 'swr';

import type { LogGetResponse } from '../pages/api/log/get';
import type { SwitcherGetResponse } from '../pages/api/switcher/get';
import type { SwitcherDeleteRequest, SwitcherDeleteResponse } from '../pages/api/switcher/delete/[id]';
import type { SwitcherCreateRequest, SwitcherCreateResponse } from '../pages/api/switcher/post';
import type { SwitcherUpdateRequest, SwitcherUpdateResponse } from '../pages/api/switcher/patch';

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
);

const apiClient = {
  switcher: {
    create: (req: SwitcherCreateRequest) => axios.post<SwitcherCreateResponse>('/api/switcher/post', req),
    update: (req: SwitcherUpdateRequest) => axios.patch<SwitcherUpdateResponse>('/api/switcher/patch', req),
    delete: (req: SwitcherDeleteRequest) => axios.delete<SwitcherDeleteResponse>(`/api/switcher/delete/${req.id}`),
  },
};

export default apiClient;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useSwitcherSWR = (fallbackData?: SwitcherGetResponse) => {
  const { data, error, mutate } = useSWR<SwitcherGetResponse>('/api/switcher/get', fetcher, { fallbackData });
  return {
    isLoading: !error && !data,
    switchers: data,
    error,
    mutate,
  };
};

export const useLogSWR = (fallbackData?: LogGetResponse) => {
  const { data, error, mutate } = useSWR<LogGetResponse>('/api/log/get', fetcher, { fallbackData });
  return {
    isLoading: !error && !data,
    data,
    error,
    mutate,
  };
};
