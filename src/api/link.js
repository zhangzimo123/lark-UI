import { axios } from '@/utils/request'

const api = {
  list: '/link/list'
}

export default api

export function LinkList (parameter) {
  return axios({
    url: api.list,
    method: 'get',
    params: parameter
  })
}
