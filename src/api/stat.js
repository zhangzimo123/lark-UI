import { axios } from '@/utils/request'

const api = {
  getStatHistorys: '/getStat/latest',
  getToolStat: '/getStat/latest',
  getTaskStat: '/getStat/latest'
}

export default api

export function getStatHistorys (parameter) {
  return axios({
    url: api.getStatHistorys,
    method: 'get',
    params: parameter
  })
}
export function getToolStat (parameter) {
  return axios({
    url: api.getToolStat,
    method: 'get',
    params: parameter
  })
}
export function getTaskStat (parameter) {
  return axios({
    url: api.getTaskStat,
    method: 'get',
    params: parameter
  })
}
