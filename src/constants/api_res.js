/**
 * 返回参数
 * @param {*} data 
 * @param {*} success 
 * @param {*} errorMessage 
 */
function showResult(data, code = 200, msg = '', errorCode = null) {
    return {
        code,
        data,
        msg,
        errorCode
    }
}

/**
 * 返回错误消息
 * @param {*} errorMessage
 * @param {*} errorCode
 * @param {*} data
 * @param {*} action
 */
function showError(errorMessage = '', errorCode = 10000, data = {}) {
    return showResult(data, 500, errorMessage, errorCode)
}

/**
 * @param {*} msg 
 * @returns 
 */
function needLoginIn(msg = '请先登录') {
    return showResult({}, 500, msg, 10000)
}

export default {
    showResult,
    showError,
    needLoginIn
}