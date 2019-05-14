import { axios } from '@/utils/request'

const api = {
  talkMembers: 'talk/members',
  groupInfo: 'talk/group/info',
  groupList: 'talk/group/list',
  contactsInfo: 'talk/contacts/info',
  contactsTree: 'talk/contacts/tree'
}

export default api

export function getTalkMembers (parameter) {
  return axios({
    url: api.talkMembers,
    method: 'get',
    params: parameter
  })
}

/**
 * 通过群组id获取群组详细信息
 * @param {String} groupId 群组id
 */
export function getGroupInfo (groupId) {
  return axios({
    url: api.groupInfo,
    method: 'GET',
    params: groupId
  })
}

/**
 * 通过联系人id获取联系人详细信息
 * @param {String} contactsId 联系人id
 */
export function getContactsInfo (contactsId) {
  return axios({
    url: api.contactsInfo,
    method: 'GET',
    params: contactsId
  })
}

/**
 * 获取群组列表
 * @author jihainan
 */
export function getGroupList () {
  return axios({
    url: api.groupList,
    method: 'GET'
  })
}

/**
 * 获取联系人树
 * @author jihainan
 */
export function getContactsTree () {
  return axios({
    url: api.contactsTree,
    method: 'GET'
  })
}
