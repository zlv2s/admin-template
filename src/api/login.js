import request from '@utils/request'

/**
 * 获取验证码
 */
export function getSms(data) {
  return request({
    url: '/getSms/',
    method: 'POST',
    data
  })
}

/**
 * 获取用户角色
 */
export function getUserRole(data = {}) {
  return request({
    method: 'POST',
    url: '/userRole/',
    data
  })
}

/**
 * 退出
 */
export function logout(data = {}) {
  return request({
    method: 'POST',
    url: '/logout/',
    data
  })
}

/**
 * 登录
 */
export function login(data) {
  return request({
    method: 'POST',
    url: '/login/',
    data
  })
}

/**
 * 注册
 */
export function register(data) {
  return request({
    method: 'POST',
    url: '/register/',
    data
  })
}
