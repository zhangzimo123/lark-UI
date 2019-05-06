import { axios } from '@/utils/request'

const api = {
  latest: '/pdmtdm/latest'
}

export default api

export function getPdmtdm (parameter) {
  return axios({
    url: api.latest,
    method: 'get',
    params: parameter
  })
}
