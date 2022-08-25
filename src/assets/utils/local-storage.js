/**
 * localstorage common operation file
 */

/**
 * 从localstorage获取当前用户角色
 */
function getLoginUserInfo() {
  return localStorage.getItem('loginUserInfo')
}

/**
 * 设置当前用户角色到localstorage
 */
function setLoginUserInfo(loginUserInfo) {
  localStorage.setItem('loginUserInfo', loginUserInfo)
}

export {
  getLoginUserInfo,
  setLoginUserInfo
}
