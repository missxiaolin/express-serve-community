import _ from 'lodash'
import UserContent from '../../../admController/user'
import RouterConfigBuilder from '../../../library/utils/router_config_builder'

const userContent = new UserContent()

// 保存公告
const index = RouterConfigBuilder.routerConfigBuilder('/adm/user/login', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return userContent.login(req, res)
}, false)


export default {
    ...index,
}