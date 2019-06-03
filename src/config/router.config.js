// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView, GeneralView } from '@/components/layouts'
// import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: GeneralView,
        meta: { title: '工作舱', keepAlive: true, icon: 'home', permission: [ 'dashboard' ] },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '数据看板', keepAlive: true, icon: 'fund', permission: [ 'dashboard' ] }
          },
          {
            path: '/dashboard/monitor',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Monitor'),
            meta: { title: '工作台', keepAlive: false, icon: 'dashboard', permission: [ 'dashboard' ] }
          }
        ]
      },
      // talk
      {
        path: '/talk',
        name: 'talk',
        component: GeneralView,
        redirect: '/talk/ChatPanel',
        meta: { title: '研讨中心', icon: 'message', hideHeader: true, keepAlive: true, permission: [ 'talk' ] },
        hideChildrenInMenu: true,
        children: [
          {
            path: '/talk/ChatPanel',
            name: 'ChatPanel',
            component: () => import('@/views/talk/ChatPanel'),
            meta: { title: '研讨面板', keepAlive: true, permission: ['talk'], hidden: true },
            children: [
              {
                path: '/talk/ChatPanel/ChatBox',
                name: 'ChatBox',
                component: () => import('@/views/talk/ChatBox'),
                meta: { title: '研讨页', keepAlive: true, permission: ['talk'], hidden: true }
              }
            ]
          }]
      },
      {
        path: '/list',
        name: 'list',
        component: PageView,
        redirect: '/list/user-list',
        meta: {
          title: '系统管理',
          icon: 'appstore',
          permission: ['user', 'org', 'role']
        },
        children: [
          {
            path: '/list/user-list',
            name: 'UserList',
            component: () => import('@/views/admin/UserList'),
            meta: {
              title: '用户管理',
              icon: 'team',
              keepAlive: true,
              permission: ['user']
            }
          },
          {
            path: '/list/org-list',
            name: 'OrgList',
            component: () => import('@/views/admin/OrgList'),
            meta: {
              title: '组织管理',
              icon: 'cluster',
              keepAlive: true,
              permission: ['org']
            }
          },
          {
            path: '/list/role-list',
            name: 'RoleList',
            component: () => import('@/views/admin/RoleList'),
            meta: {
              title: '角色管理',
              icon: 'switcher',
              keepAlive: true,
              permission: ['role']
            }
          },
          {
            path: '/list/service-list',
            name: 'ServiceList',
            component: () => import('@/views/admin/ServiceList'),
            meta: {
              title: '服务管理',
              icon: 'switcher',
              keepAlive: true,
              permission: ['jj']
            }
          }
        ]
      },
      // result
      {
        path: '/result',
        name: 'result',
        component: PageView,
        redirect: '/result/success',
        meta: { title: '工具', icon: 'check-circle-o', permission: [ 'result' ] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: '成功', hiddenHeaderContent: true, permission: [ 'result' ] }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: '失败', hiddenHeaderContent: true, permission: [ 'result' ] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        // 在侧导航中隐藏
        hidden: true,
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, keepAlive: true, permission: [ 'user' ] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/workplace',
                name: 'WorkPlaceSettings',
                component: () => import('@/views/account/settings/Workplace'),
                meta: { title: '工作台设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
