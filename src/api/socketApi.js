// import storeConfig from '../store/modules/msgStore'
import store from '../store'
/**
 * @param {*} ws_protocol wss or ws
 * @param {*} ip
 * @param {*} port
 * @param {*} paramStr 加在ws url后面的请求参数，形如：name=张三&id=12
 * @param {*} param 作为tio.ws对象的参数，由业务自己使用，框架不使用
 * @param {*} heartbeatTimeout 心跳时间 单位：毫秒
 * @param {*} reconnInterval 重连间隔时间 单位：毫秒
 * @param {*} binaryType 'blob' or 'arraybuffer';//arraybuffer是字节
 */
const socketApi = function (ws_protocol, ip, port, paramStr, param, heartbeatTimeout, reconnInterval, binaryType) {
  this.ip = ip || '127.0.0.1'
  this.port = port || '9326'
  this.url =  'ws://127.0.0.1:9326'
  this.binaryType = binaryType || 'arraybuffer'

  if (paramStr) {
    this.url += '?' + paramStr
  }
  this.param = param
  this.heartbeatTimeout = heartbeatTimeout || 50000
  this.reconnInterval = reconnInterval || 1000

  this.lastInteractionTime = function () {
    const len = arguments.length
    if (len == 1) {
      this.lastInteractionTimeValue = arguments[0]
    }
    return this.lastInteractionTimeValue
  }

  this.heartbeatSendInterval = heartbeatTimeout / 2

  this.connect = function () {
    const ws = new WebSocket(this.url)
    this.ws = ws

    ws.binaryType = this.binaryType; // 'arraybuffer'; // 'blob' or 'arraybuffer';//arraybuffer是字节
    const self = this
    ws.onopen = function (event) {
      console.info('连上了'+event)
      ws.send('123')
      self.lastInteractionTime(new Date().getTime())
      self.pingIntervalId = setInterval(function () {
        //开始发心跳了
        self.ping(self)
      }, self.heartbeatSendInterval)
    }
    ws.onmessage = function (event) {
      console.log('收到了'+event.data)
      const a = new Date
      store.dispatch('SET_MSG', JSON.parse(event.data)+a)
      // console.log(store.state.getMsg())

      // this.dispatchEvent()
      // alert(event.data)
      self.lastInteractionTime(new Date().getTime())
    }
    ws.onclose = function (event) {
      clearInterval(self.pingIntervalId) // clear send heartbeat task
      try {
        console.log('走远了'+event)
      } catch (error) {}
      self.reconn(event)
    }
    ws.onerror = function (event) {
      // self.handler.onerror.call(self.handler, event, ws)
    }

    return ws
  }

  this.reconn = function (event) {
    const self = this
    setTimeout(function () {
      console.log('i will be back'+event)
      const ws = self.connect()
      self.ws = ws
    }, self.reconnInterval)
  }

  this.ping = function () {
    // console.log('我来了'+event)
    var iv = new Date().getTime() - this.lastInteractionTime(); // 已经多久没发消息了
    // 单位：秒
    if ((this.heartbeatSendInterval + iv) >= this.heartbeatTimeout) {
      this.ws.send('心跳内容')
    }
  };

  this.send = function(data){
    this.ws.send(data);
  };
}
export default socketApi