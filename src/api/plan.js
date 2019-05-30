import { axios } from '@/utils/request'

const api = {
  plan: '/plan/latest'
}

export default api

export function planData (params) {
  return axios({
    url: api.plan,
    method: 'get',
    params: params
  })
}
