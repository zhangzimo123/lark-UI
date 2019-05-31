const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  messageListMap: state => state.chat.messageListMap,
  chatMap: state => state.chat.chatMap,
  messageList: state => state.chat.messageList,
  currentChat: state => state.chat.currentChat,
  chatList: state => state.chat.recentChatList,
  userFriendList: state => state.chat.userFriendList,
  flushTokenTimerId: state => state.chat.flushTokenTimerId
}

export default getters
