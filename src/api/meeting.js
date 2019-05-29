import { axios } from '@/utils/request'

const api = {
  meeting: '/meeting/latest'
}

export default api

export function meetingData (params) {
  return axios({
    url: api.meeting,
    method: 'get',
    params: params
  })
}