import Axios from 'axios';
import useSWR from 'swr';

import useEnqueueSnackbar from '../hooks/useEnqueueSnackbar';

import type { LogGetResponse } from '../pages/api/log/get';
import type { SwitcherGetResponse } from '../pages/api/switcher/get';
import type { SwitcherDeleteRequest, SwitcherDeleteResponse } from '../pages/api/switcher/delete/[id]';
import type { SwitcherCreateRequest, SwitcherCreateResponse } from '../pages/api/switcher/post';
import type { SwitcherUpdateRequest, SwitcherUpdateResponse } from '../pages/api/switcher/patch';

const useApiClient = () => {
  const { enqueueErrorSnackbar } = useEnqueueSnackbar();

  const instance = Axios.create();

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        const message = error.response.data ? error.response.data.message : error.message;
        enqueueErrorSnackbar(message, {
          httpError: { status: error.response.status, errorCode: error.code, url: error.config.url },
        });
      } else if (error.request) {
        // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
        enqueueErrorSnackbar(error.message, {
          httpError: { status: error.request.status, errorCode: error.code, url: error.config.url },
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        enqueueErrorSnackbar(error.message, {
          httpError: { errorCode: error.code, url: error.config.url },
        });
      }
      return Promise.reject(error);
    }
  );

  const apiClient = {
    switcher: {
      create: (req: SwitcherCreateRequest) => instance.post<SwitcherCreateResponse>('/api/switcher/post', req),
      update: (req: SwitcherUpdateRequest) => instance.patch<SwitcherUpdateResponse>('/api/switcher/patch', req),
      delete: (req: SwitcherDeleteRequest) => instance.delete<SwitcherDeleteResponse>(`/api/switcher/delete/${req.id}`),
    },
  };

  const fetcher = (url: string) => instance.get(url).then((res) => res.data);

  const useSwitcherSWR = (fallbackData?: SwitcherGetResponse) => {
    const { data, error, mutate } = useSWR<SwitcherGetResponse>('/api/switcher/get', fetcher, { fallbackData });
    return {
      isLoading: !error && !data,
      switchers: data,
      error,
      mutate,
    };
  };

  const useLogSWR = (fallbackData?: LogGetResponse) => {
    const { data, error, mutate } = useSWR<LogGetResponse>('/api/log/get', fetcher, { fallbackData });
    return {
      isLoading: !error && !data,
      data,
      error,
      mutate,
    };
  };

  return {
    apiClient,
    useSwitcherSWR,
    useLogSWR,
  };
};

export default useApiClient;
