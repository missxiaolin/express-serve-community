import _ from 'lodash'
import UserContent from '../../../controller/user'
import RouterConfigBuilder from '../../../library/utils/router_config_builder'

const userController = new UserContent()

// 用户点赞
const fabulousSave = RouterConfigBuilder.routerConfigBuilder('/api/fabulous/save', RouterConfigBuilder.METHOD_TYPE_GET, (req, res) => {
    return userController.getUserArticleAchievement(req, res)
}, true)


export default {
    ...fabulousSave,
}