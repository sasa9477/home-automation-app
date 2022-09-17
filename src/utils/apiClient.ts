import axios from 'axios';

import {
  LogCreateRequest,
  LogCreateResponse,
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
    create: (req: LogCreateRequest) => axios.post<LogCreateResponse>('/api/switcher/post', req),
  },
};

export default apiClient;
