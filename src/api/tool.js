import { axios } from '@/utils/request'

const api = {
  latest: '/tool/latest'
}

export default api

export function getMyTools (parameter) {
  return axios({
    url: api.latest,
    method: 'get',
    params: parameter
  })
}
export function getHotTools (parameter) {
  return axios({
    url: api.latest,
    method: 'get',
    params: parameter
  })
}
export function getLatestTools (parameter) {
  return axios({
    url: api.latest,
    method: 'get',
    params: parameter
  })
}
