import { axios } from '@/utils/request'

const api = {
  latest: '/resource/latest',
  stat: '/resource/stat'
}

export default api

export function ResourceLatest (parameter) {
  return axios({
    url: api.latest,
    method: 'get',
    params: parameter
  })
}

export function ResourceStat (parameter) {
  return axios({
    url: api.stat,
    method: 'get',
    params: parameter
  })
}
