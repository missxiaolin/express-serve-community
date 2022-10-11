import _ from 'lodash'
import UserContent from '../../../controller/user'
import RouterConfigBuilder from '../../../library/utils/router_config_builder'

const userController = new UserContent()

// 用户成就
const userArticleAchievement = RouterConfigBuilder.routerConfigBuilder('/api/user/achievement', RouterConfigBuilder.METHOD_TYPE_GET, (req, res) => {
    return userController.getUserArticleAchievement(req, res)
}, true)

// 用户文章列表
const userArticleList = RouterConfigBuilder.routerConfigBuilder('/api/user/article/list', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return userController.getUserList(req, res)
}, true)

export default {
    ...userArticleAchievement,
    ...userArticleList
    
}