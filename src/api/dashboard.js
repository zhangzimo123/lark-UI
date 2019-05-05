
import { axios } from '@/utils/request'

const api = {
  monitor: '/monitor'
}

export default api

export function MonitorData (params) {
  return axios({
    url: api.monitor,
    method: 'get',
    params: params
  })
}
