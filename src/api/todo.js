import { axios } from '@/utils/request'

const api = {
  latest: '/todo/latest'
}

export default api

export function TodoLatest (parameter) {
  return axios({
    url: api.latest,
    method: 'get',
    params: parameter
  })
}
