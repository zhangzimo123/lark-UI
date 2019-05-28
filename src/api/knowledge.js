import { axios } from '@/utils/request'

const api = {
  knowledge: '/knowledge/latest'
}

export default api

export function knowledgeData (params) {
  return axios({
    url: api.knowledge,
    method: 'get',
    params: params
  })
}
