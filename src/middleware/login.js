import Token from '../library/utils/token'
import API_RES from '../constants/api_res'

/**
 * login 中间件
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
function login(req, res, next) {
    let token = req.get('token') || ""
    if (!token) {
        res.send(JSON.stringify(API_RES.needLoginIn()));
        return
    }
    let data = Token.decrypt(token)
    if (data.token) {
        next()
    } else {
        res.send(JSON.stringify(API_RES.needLoginIn()));
        return
    }
}

export default login