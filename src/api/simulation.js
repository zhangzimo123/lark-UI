import { axios } from '@/utils/request'

const api = {
  simulation: '/simulation/latest'
}
export default api
export function getSimulations (parameter) {
  return axios({
    url: api.simulation,
    method: 'get',
    params: parameter
  })
}
