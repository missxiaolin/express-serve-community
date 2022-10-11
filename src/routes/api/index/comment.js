import _ from 'lodash'
import CommentContent from '../../../controller/comment'
import RouterConfigBuilder from '../../../library/utils/router_config_builder'

const commentContent = new CommentContent()

// 用户评论
const commentSave = RouterConfigBuilder.routerConfigBuilder('/api/comment/save', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return commentContent.save(req, res)
}, true)


export default {
    ...commentSave,
}