import { axios } from '@/utils/request'

const api = {
  latest: '/task/latest'
}

export default api

export function TaskLatest (parameter) {
  return axios({
    url: api.latest,
    method: 'get',
    params: parameter
  })
}
