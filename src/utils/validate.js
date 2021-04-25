/**
 * 验证是否为合法邮箱地址
 * @param {String} s 待验证字符串
 * @returns {Boolean} 验证结果
 */
export function isValidEmail(s) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(s).toLowerCase())
}

/**
 * 验证密码，长度6-20，包含数字，大小写字母
 * @param {String} s 密码字符串
 * @returns {Boolean} 验证结果
 */
export function isValidPassword(s) {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/
  return re.test(s)
}

/**
 * 验证码，六位，包含数字、字母
 * @param {String} s 验证码字符串
 * @returns {Boolean} 验证结果
 */
export function isValidCode(s) {
  const re = /[a-z0-9]{6}/i
  return re.test(s)
}
