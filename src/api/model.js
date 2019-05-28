import { axios } from '@/utils/request'

const api = {
  model: '/model/latest'
}

export default api

export function modelData (params) {
  return axios({
    url: api.model,
    method: 'get',
    params: params
  })
}
