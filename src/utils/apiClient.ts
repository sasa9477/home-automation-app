import axios from 'axios';

import {
  LogCreateRequest,
  LogCreateResponse,
  LogGetRequest,
  LogGetResponse,
  SwitcherCreateRequest,
  SwitcherCreateResponse,
  SwitcherDeleteRequest,
  SwitcherDeleteResponse,
  SwitcherGetRequest,
  SwitcherGetResponse,
  SwitcherUpdateRequest,
  SwitcherUpdateResponse,
} from '../interfaces';

const apiClient = {
  switcher: {
    get: (req?: SwitcherGetRequest) => axios.get<SwitcherGetResponse>('/api/switcher/get', req),
    create: (req: SwitcherCreateRequest) => axios.post<SwitcherCreateResponse>('/api/switcher/post', req),
    update: (req: SwitcherUpdateRequest) => axios.put<SwitcherUpdateResponse>('/api/switcher/put', req),
    delete: (req: SwitcherDeleteRequest) => axios.delete<SwitcherDeleteResponse>(`/api/switcher/delete/${req.id}`),
  },
  log: {
    get: (req: LogGetRequest) => axios.post<LogGetResponse>('/api/switcher/post', req),
    create: (req: LogCreateRequest) => axios.post<LogCreateResponse>('/api/switcher/post', req),
  },
};

export default apiClient;
