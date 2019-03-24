import { axios } from '@/utils/request'

const api = {
  talkMembers: '/talk/members'
}

export default api

export function getTalkMembers (parameter) {
  return axios({
    url: api.talkMembers,
    method: 'get',
    params: parameter
  })
}
