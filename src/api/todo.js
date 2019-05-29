import { axios } from '@/utils/request'

const api = {
  todo: '/todo/latest'
}

export default api

export function todoData (params) {
  return axios({
    url: api.todo,
    method: 'get',
    params: params
  })
}
