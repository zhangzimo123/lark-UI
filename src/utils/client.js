/* eslint-disable */

/**
 * 云雀客户端的方法
 * // TODO: 对客户端对象不存在时做处理
 * // NOTE: 添加eslint-disable避免编译报错
 */

/**
 * 最小化窗口
 */
export function minimizeWindow () {
  console.log('调用客户端**最小化窗口**的方法')
}

/**
 * 最大/小化切换
 */
export function switchWindow () {
  console.log('调用客户端**切换窗口**的方法')
}

/**
 * 关闭窗口
 */
export function closeWindow () {
  console.log('调用客户端**关闭窗口**的方法')
}

/**
 * 判断是否最大化
 * 该方法仅在chrome浏览器上有效
 * @return Boolean
 */
export function isFullScreen () {
  let explorer = window.navigator.userAgent.toLowerCase()
  if (explorer.indexOf(chrome) > 0) {
    return window.outerHeight === screen.availHeight && window.outerWidth === screen.availWidth
  } else {
    // 非chrome浏览器，待处理
    return false
  }
}
