import { axios } from '@/utils/request'

const api = {
  latest: '/news/latest'
}

export default api

export function getNews (parameter) {
  return axios({
    url: api.latest,
    method: 'get',
    params: parameter
  })
}
