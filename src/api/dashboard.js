
import { axios } from '@/utils/request'

const api = {
  monitor: '/monitor',
  datas: '/datas/latest',
  knowledge: '/knowledge/latest',
  meeting: '/meeting/latest',
  model: '/model/latest',
  news: '/news/latest',
  pdmtdm: '/pdmtdm/latest',
  plan: '/plan/latest',
  resource: '/resource/latest',
  simulation: '/simulation/latest'
}

export default api

export function MonitorData (params) {
  return axios({
    url: api.monitor,
    method: 'get',
    params: params
  })
}

export function datasData (params) {
  return axios({
    url: api.datas,
    method: 'get',
    params: params
  })
}

export function knowledgeData (params) {
  return axios({
    url: api.knowledge,
    method: 'get',
    params: params
  })
}

export function meetingData (params) {
  return axios({
    url: api.meeting,
    method: 'get',
    params: params
  })
}

export function modelData (params) {
  return axios({
    url: api.model,
    method: 'get',
    params: params
  })
}

export function getNews (parameter) {
  return axios({
    url: api.latest,
    method: 'get',
    params: parameter
  })
}

export function getPdmtdm (parameter) {
  return axios({
    url: api.latest,
    method: 'get',
    params: parameter
  })
}

export function planData (params) {
  return axios({
    url: api.plan,
    method: 'get',
    params: params
  })
}

export function resourceData (params) {
  return axios({
    url: api.resource,
    method: 'get',
    params: params
  })
}

export function simulationData (params) {
  return axios({
    url: api.simulation,
    method: 'get',
    params: params
  })
}
