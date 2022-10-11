import _ from 'lodash'
import UserContent from '../../../controller/user'
import RouterConfigBuilder from '../../../library/utils/router_config_builder'

const userController = new UserContent()

// 用户评论
const commentSave = RouterConfigBuilder.routerConfigBuilder('/api/comment/save', RouterConfigBuilder.METHOD_TYPE_GET, (req, res) => {
    return userController.getUserArticleAchievement(req, res)
}, true)


export default {
    ...commentSave,
}