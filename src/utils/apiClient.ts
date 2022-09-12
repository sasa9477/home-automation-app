import axios from 'axios';
import {
  LogCreateRequest,
  LogCreateResponse,
  SwitcherCreateRequest,
  SwitcherCreateResponse,
  SwitcherDeleteRequest,
  SwitcherDeleteResponse,
  SwitcherUpdateRequest,
  SwitcherUpdateResponse,
} from '../interfaces';

const apiClient = {
  switcher: {
    create: (req: SwitcherCreateRequest) => axios.post<SwitcherCreateResponse>('/api/switcher/create', req),
    update: (req: SwitcherUpdateRequest) => axios.put<SwitcherUpdateResponse>('/api/switcher/create', req),
    delete: (req: SwitcherDeleteRequest) => axios.delete<SwitcherDeleteResponse>(`/api/switcher/create/${req}`),
  },
  log: {
    create: (req: LogCreateRequest) => axios.post<LogCreateResponse>('/api/switcher/create', req),
  },
};

export default apiClient;
