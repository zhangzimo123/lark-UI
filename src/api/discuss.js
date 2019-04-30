import { axios } from '@/utils/request'

const api = {
  latest: '/discuss/latest'
}

export default api

export function DiscussLatest (parameter) {
  return axios({
    url: api.latest,
    method: 'get',
    params: parameter
  })
}
