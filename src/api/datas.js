import { axios } from '@/utils/request'

const api = {
  datas: '/datas/latest'
}
export default api
export function getDatas (parameter) {
  return axios({
    url: api.datas,
    method: 'get',
    params: parameter
  })
}
