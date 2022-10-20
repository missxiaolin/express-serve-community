// mysql 配置。 mysql 使用参见 https://dev.mysql.com/doc/refman/8.0/en/
import env from './env'

// 下面的特定环境可以深度合并到上面的默认环境
// 线上环境是上面的默认环境，不要乱改哦
// 测试环境：
// rm-uf6aw5vkvp7zi049y6o.mysql.rds.aliyuncs.com （外网地址） 3306
// 库名：yoga
// yoga_test|gaY0fff@1017


// 正式环境：
// quj1htc8qo65kpp3lh3y-rw4rm.rwlb.rds.aliyuncs.com （内外代理） 3306
// 库名：yoga
// yoga|gaY01IL@1017

// 开发环境配置
const development = {
    /* nomal */
    host: 'rm-uf6aw5vkvp7zi049y6o.mysql.rds.aliyuncs.com',
    port: '3306',
    user: 'yoga_test',
    password: 'gaY0fff@1017',
    database: 'yoga'
    // host: '127.0.0.1',
    // port: '3306',
    // user: 'root',
    // password: 'root',
    // database: 'yoga'
}
// 测试环境配置
const testing = development

// 线上环境
const production = testing

let config = {
    development,
    testing,
    production
}

export default config[env]
