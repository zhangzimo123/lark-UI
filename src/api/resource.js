import { axios } from '@/utils/request'

const api = {
  resource: '/resource/latest'
}

export default api

export function resourceData (params) {
  return axios({
    url: api.resource,
    method: 'get',
    params: params
  })
}
