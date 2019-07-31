import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'views/layout/layout'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        // name: 'home',
        component: Layout,
        redirect: '/filed', //formManage/
        meta: { title: '表单管理', icon: 'el-icon-edit-outline' },
        children: [{
            path: 'page',
            name: 'page',
            meta: { title: '表单模板配置', icon: 'el-icon-edit-outline' },
            component: resolve => require(['views/formmanage/page'], resolve),
        }, {
            path: 'filed',
            name: 'filed',
            meta: { title: '表单元素管理', icon: 'el-icon-edit-outline' },
            component: resolve => require(['views/formmanage/filed'], resolve)
        }, {
            path: 'table',
            name: 'table',
            meta: { title: '表格管理', icon: 'el-icon-edit-outline' },
            component: resolve => require(['views/formmanage/table'], resolve)
        }, {
            path: 'reviews',
            name: 'reviews',
            component: resolve => require(['@/components/form/index'], resolve),
        }]
    }]
})