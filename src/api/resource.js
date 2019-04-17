import { axios } from '@/utils/request'

const api = {
  latest: '/resource/latest'
}

export default api

export function ResourceLatest (parameter) {
  return axios({
    url: api.latest,
    method: 'get',
    params: parameter
  })
}
