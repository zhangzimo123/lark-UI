import modules from './conf'
import { Chat, ChatListUtils, MessageInfoType, MessageTargetType, transform } from '../../utils/talk/chatUtils'
import conf from '@/api/index'
import { getGroupList, getContactsTree, getRecentContacts } from '@/api/chat'

const chat = {
  state: {
    // token: {},
    // token 是否有效
    // tokenStatus: false,
    // 当前的用户
    user: {},
    flushLocalStore: false,
    websocket: {},
    messageListMap: new Map(),
    // 研讨群的图片映射
    chatMap: new Map(),
    messageList: [],
    // 当前研讨窗口
    currentChat: {},
    // 所有的研讨窗口(最近联系人)
    recentChatList: [],
    // 好友列表(联系人)
    contactsTree: [],
    // 群组列表(群组)
    groupList: [],
    // 刷新token 的定时器
    flushTokenTimerId: null
  },
  mutations: {
    /** modify -> jihainan */
    SET_CONTACTS_TREE: function (state, contactsTree) {
      state.contactsTree = contactsTree
    },
    /** modify -> jihainan */
    SET_GROUP_LIST: function (state, groupList) {
      state.groupList = groupList
    },
    SET_CHAT_MAP: function (state, chatMap) {
      state.chatMap = chatMap
    },
    SET_WEBSOCKET: function (state, websocket) {
      state.websocket = websocket
    },
    // 发送给服务器
    SEND_MESSAGE: function (state, message) {
      const msg = {
        code: MessageInfoType.MSG_MESSAGE,
        message: message
      }
      state.websocket.send(JSON.stringify(msg))
    },
    RESET_UNREAD: function (state) {
      state.currentChat.unReadCount = 0
    },
    // 退出后清除内存中的研讨信息
    CLEAR: function (state) {
      state.messageList = []
      state.messageListMap = new Map()
    },
    // 保存到内存
    ADD_MESSAGE: function (state, message) {
      message.content = transform(message.content)
      state.messageList.push(message)
      state.messageListMap.set(message.id, state.messageList)
    },
    // 在用户姓名下展示收到的最后一条信息
    SET_LAST_MESSAGE: function (state, message) {
      const list = ChatListUtils.getChatList(state.user.id)
      const tempChatList = list.map(function (chat) {
        if (String(chat.id) === String(message.fromid) && message.type === '0') {
          chat.sign = message.content
        } else if (String(chat.id) === String(message.id) && message.type === '1') {
          chat.sign = message.content
        }
        return chat
      })
      // 放入缓存
      ChatListUtils.setMessageList(state.user.id, tempChatList)
      state.recentChatList = tempChatList
    },
    SET_MESSAGE_LIST: function (state, messageList) {
      state.messageList = messageList
    },
    SET_MESSAGE_LIST_MAP: function (state, messageListMap) {
      state.messageListMap = messageListMap
    },
    ADD_UNREAD_MESSAGE: function (state, message) {
      message.content = transform(message.content)
      if (message.type === '0') {
        // 从内存中取研讨信息
        let cacheMessages = state.messageListMap.get(message.fromid)
        if (cacheMessages) {
          cacheMessages.push(message)
        } else {
          cacheMessages = []
          cacheMessages.push(message)
          state.messageListMap.set(message.fromid, cacheMessages)
        }
      } else {
        // 从内存中取研讨信息
        let cacheMessages = state.messageListMap.get(message.id)
        if (cacheMessages) {
          cacheMessages.push(message)
        } else {
          cacheMessages = []
          cacheMessages.push(message)
          state.messageListMap.set(message.id, cacheMessages)
        }
      }
    },
    SET_CURRENT_CHAT: function (state, currentChat) {
      state.currentChat = currentChat
      state.currentChat.unReadCount = 0

      const tempChatList = state.recentChatList.map(function (chat) {
        if (String(chat.id) === String(currentChat.id)) {
          chat.unReadCount = 0
        }
        return chat
      })
      // 放入缓存
      ChatListUtils.setChatList(this.getters.userInfo.id, tempChatList)
    },
    SET_RECENT_CHAT_LIST: function (state, recentChatList) {
      state.recentChatList = recentChatList
    },
    DEL_CHAT: function (state, chat) {
      state.recentChatList = ChatListUtils.delChat(state.user.id, chat)
    },
    /**
     * 设置未读消息条数
     * @param state state
     * @param message 消息
     */
    SET_UNREAD_COUNT: function (state, message) {
      const tempChatList = []
      let tempChat = {}

      for (const chat of state.recentChatList) {
        // 给接受消息的研讨室未读数量 +1
        if (String(chat.id) === String(message.fromid) && message.type === MessageTargetType.FRIEND) {
          if (!chat.unReadCount) {
            chat.unReadCount = 0
          }
          chat.unReadCount = chat.unReadCount + 1
          tempChat = chat
        } else if (String(chat.id) === String(message.id) && message.type === MessageTargetType.CHAT_GROUP) {
        // 群组研讨
          if (!chat.unReadCount) {
            chat.unReadCount = 0
          }
          chat.unReadCount = chat.unReadCount + 1
          chat.avatar = conf.getHostUrl() + state.chatMap.get(message.id).avatar
          tempChat = chat
        } else {
          tempChatList.push(chat)
        }
      }
      // 研讨列表没有此人的chat
      if (!tempChat.id && message.type === MessageTargetType.FRIEND) {
        tempChat = new Chat(message.fromid, message.username, message.avatar, 1, message.content, state.user.mobile, state.user.email, MessageTargetType.FRIEND)
      } else if (!tempChat.id && message.type === MessageTargetType.CHAT_GROUP) {
        const groupChat = state.chatMap.get(message.id)
        console.log(groupChat)
        tempChat = new Chat(message.id, groupChat.name, conf.getHostUrl() + groupChat.avatar, 1, message.content, state.user.mobile, state.user.email, MessageTargetType.CHAT_GROUP)
        console.log(tempChat)
      }
      // 添加到研讨室列表的第一个
      tempChatList.unshift(tempChat)
      // 重新设置chatList
      state.recentChatList = tempChatList
      // 放入缓存
      ChatListUtils.setMessageList(state.user.id, tempChatList)
    }
  },
  actions: {
    /**
     * get group list or refresh group list
     * if anything affects group list, dispatch this action
     * @author jihainan
     */
    GetGroupList ({ commit }) {
      return new Promise((resolve, reject) => {
        getGroupList().then(response => {
          if (response.status === 200) {
            commit('SET_GROUP_LIST', [ ...response.result.data ])
          } else {
            reject(new Error('getGroupList: 服务器发生错误!'))
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     * 获取联系人树
     * 当联系人数据被改变，dispatch这个方法
     * @author jihainan
     */
    GetContactsTree ({ commit }) {
      return new Promise((resolve, reject) => {
        getContactsTree().then(response => {
          if (response.status === 200) {
            commit('SET_CONTACTS_TREE', [ ...response.result.data ])
          } else {
            reject(new Error('getContactsTree: 服务器发生错误!'))
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     * 获取最近联系人列表
     * 当最近联系人有变化时，dispatch这个方法
     * @author jihainan
     */
    GetRecentContacts ({ commit }) {
      return new Promise((resolve, reject) => {
        getRecentContacts().then(response => {
          if (response.status === 200) {
            commit('SET_RECENT_CHAT_LIST', [ ...response.result.data ])
          } else {
            reject(new Error('getRecentContacts: 服务器发生错误'))
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  modules,
  strict: process.env.NODE_ENV !== 'production'
}

export default chat
