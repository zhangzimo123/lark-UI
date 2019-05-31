/**
 * fanjiao add
 * 主要用于组织管理模块、用户管理模块相关接口请求
 *
 */
import { axios } from '@/utils/request'

const api = {
  orgTree: '/admin/org/tree',
  user: '/admin/user',
  org: '/admin/org',
  role: '/admin/role/page'
}

export default api
/**
 * 获取员工列表
 * @param {userinfo}
 */
export function getUserList (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}
/**
 * 获取角色列表
 * @param {userinfo}
 */
export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}
/**
 * 获取树结构组织信息
 * @param {userinfo}
 */
export function getOrgTree (parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}
/**
 * 新增员工信息
 * @param {userinfo}
 */
export function adduser (parameter) {
  return axios({
    url: api.user,
    method: 'post',
    data: parameter
  })
}
/**
 * 修改员工信息
 * @param {userinfo}
 */
export function updateuser (parameter) {
  return axios({
    url: api.user,
    method: 'put',
    data: parameter
  })
}
/**
 * 删除员工信息
 * @param {userinfo}
 */
export function deluser (parameter) {
  return axios({
    url: api.user,
    method: 'delete',
    data: parameter
  })
}
/**
 * 新增组织信息
 * @param {userinfo}
 */
export function addorg (parameter) {
  return axios({
    url: api.org,
    method: 'post',
    data: parameter
  })
}
/**
 * 修改组织信息
 * @param {userinfo}
 */
export function updateorg (parameter) {
  return axios({
    url: api.org,
    method: 'put',
    data: parameter
  })
}
/**
 * 删除组织信息
 * @param {userinfo}
 */
export function delorg (parameter) {
  return axios({
    url: api.org,
    method: 'delete',
    data: parameter
  })
}
