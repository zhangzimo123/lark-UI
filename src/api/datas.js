import { axios } from '@/utils/request'

const api = {
  datas: '/datas/latest'
}

export default api

export function datasData (params) {
  return axios({
    url: api.datas,
    method: 'get',
    params: params
  })
}