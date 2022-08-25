/**
 * localStorage工具类
 */

/**
 * 从localStorage获取sessionId
 * @returns {string}
 */
export function getSessionId() {
    return localStorage.getItem('sessionId')
}

/**
 * 设置sessionId到localStorage
 * @param sessionId
 */
export function setSessionId(sessionId) {
    localStorage.setItem('sessionId', sessionId)
}
