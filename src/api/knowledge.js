import { axios } from '@/utils/request'

const api = {
  latest: '/knowledge/latest'
}

export default api

export function getKnowledges (parameter) {
  return axios({
    url: api.latest,
    method: 'get',
    params: parameter
  })
}