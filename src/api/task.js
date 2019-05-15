import { axios } from '@/utils/request'

const api = {
  task: '/task/latest'
}

export default api

export function taskData (params) {
  return axios({
    url: api.task,
    method: 'get',
    params: params
  })
}