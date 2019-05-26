/**
 * constants.js 文件存储所有常量信息
 */

// 密级常量
const SECRETLEVEL_ENUM = new Map([
  [60, { people: '非密', file: '非密' }],
  [70, { people: '一般', file: '秘密' }],
  [80, { people: '重要', file: '机密' }],
  ['default', '非密']
])

// 错误类型
const ErrorType = {
  TIMEOUT_ERROR: 9, // 超时
  TOKEN_ERROR: 401, // token 失效错误
  PARAM_ERROR: 400, // 参数错误
  FLUSH_TOKEN_ERROR: 7, // 刷新token错误
  SERVER_ERROR: 500 // 刷新token错误
}

export {
  SECRETLEVEL_ENUM,
  ErrorType
}
