import { axios } from '@/utils/request'

const api = {
  getStatHistorys: '/stat/latest',
  getToolStat: '/stat/latest',
  getTaskStat: '/stat/latest'
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
