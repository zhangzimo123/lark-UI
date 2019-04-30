import { axios } from '@/utils/request'

const api = {
  latest: '/plan/latest'
}

export default api

export function PlanLatest (parameter) {
  return axios({
    url: api.latest,
    method: 'get',
    params: parameter
  })
}
