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
        res.send(API_RES.needLoginIn());
        return
    }
    let data = Token.decrypt(token)
    if (data.token) {
        // 将用户信息添加到req(只添加信息, 在check里在检查是否需要登录)
        req.body.user_info = {
            user_id: 1,
            auth: 'xiaolin'
        }
        next()
    } else {
        res.send(API_RES.needLoginIn());
        return
    }
    
    
}

export default login