/**
 * sessionStorage工具类
 */

/**
 * 从sessionStorage获取sessionId
 * @returns {string}
 */
export function getSessionId() {
    return sessionStorage.getItem('sessionId')
}

/**
 * 设置sessionId到localStorage
 * @param sessionId
 */
export function setSessionId(sessionId) {
    sessionStorage.setItem('sessionId', sessionId)
}
