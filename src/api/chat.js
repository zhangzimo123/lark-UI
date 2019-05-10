import { axios } from '@/utils/request'

const api = {
  talkMembers: '/talk/members',
  groupInfo: '/talk/group/info',
  contactsInfo: 'talk/contacts/info'
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
 * 通过群组id获取群组信息
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
 * 通过联系人id获取联系人信息
 * @param {String} contactsId 联系人id
 */
export function getContactsInfo (contactsId) {
  return axios({
    url: api.contactsInfo,
    method: 'GET',
    params: contactsId
  })
}
