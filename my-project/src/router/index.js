import Vue from 'vue'
import Router from 'vue-router'

// 顶部导航
import HeaderNav from '@/components/common/HeaderNav'

// 主内容
import Home from '@/views/home'

// 登陆
import Login from '@/views/login'

// 路由配置
import { pathNames } from '@/util'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'root',
            redirect: pathNames.index,
            components: {
                default: HeaderNav,
                main: Home
            },
            children: [
                {
                    path:pathNames.index,
                    name:pathNames.index
                }
            ]
        },
        {
            path: '/' + pathNames.login,
            name: pathNames.login,
            component: Login
        }
    ]
})
