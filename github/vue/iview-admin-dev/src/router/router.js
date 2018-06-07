import Main from '@/views/Main.vue'
import mainFrame from '@/views/mainFrame.vue'
import stepFrame from '@/views/userPage/selfSkills.vue'

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () =>
        import ('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () =>
        import ('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () =>
        import ('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () =>
        import ('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () =>
        import ('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () =>
        import ('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
            path: 'home',
            title: {
                i18n: 'home'
            },
            name: 'home_index',
            component: () =>
                import ('@/views/home/home.vue')
        },
        {
            path: 'ownspace',
            title: '个人中心',
            name: 'ownspace_index',
            component: () =>
                import ('@/views/own-space/own-space.vue')
        },
        {
            path: 'order/:order_id',
            title: '订单详情',
            name: 'order-info',
            component: () =>
                import ('@/views/advanced-router/component/order-info.vue')
        }, // 用于展示动态路由
        {
            path: 'shopping',
            title: '购物详情',
            name: 'shopping',
            component: () =>
                import ('@/views/advanced-router/component/shopping-info.vue')
        }, // 用于展示带参路由
        {
            path: 'message',
            title: '消息中心',
            name: 'message_index',
            component: () =>
                import ('@/views/message/message.vue')
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
        path: '/homePage',
        icon: 'home',
        name: 'homePage',
        access: '2',
        title: '欢迎页面',
        component: Main,
        children: [{
            path: 'index',
            title: '欢迎页面',
            name: 'homePage_index',
            component: () =>
                import ('@/views/userPage/homePage.vue')
        }]
    },
    {
        path: '/changeInfo',
        icon: 'clipboard',
        name: 'changeInfo',
        access: '3',
        title: '个人信息',
        component: Main,
        children: [{
            path: 'index',
            title: '个人信息',
            name: 'changeInfo_index',
            component: () =>
                import ('@/views/userPage/changeInfo.vue')
        }]
    },
    {
        path: '/stuscoreInfo',
        icon: 'clipboard',
        name: 'stuscoreInfo',
        access: '9',
        title: '成绩信息',
        component: Main,
        children: [{
            path: 'index',
            title: '成绩信息',
            name: 'stuscoreInfo_index',
            component: () =>
                import ('@/views/userPage/stuscoreInfo.vue')
        }]
    },
    {
        path: '/step',
        icon: 'android-done-all',
        name: 'step',
        access: '6',
        title: '简历步骤',
        component: Main,
        children: [{
            path: 'index',
            title: '简历步骤',
            name: 'step_index',
            redirect: 'index/ready',
            children: [
                {
                    path: 'one',
                    title: 'one',
                    name: 'one_index',
                    component: () => import ('@/views/userPage/selfSkill-stepOne.vue')
                },
                {
                    path: 'ready',
                    title: 'ready',
                    name: 'ready_index',
                    component: () => import ('@/views/userPage/selfSkill-ready.vue')
                },
                {
                    path: 'two',
                    title: 'two',
                    name: 'two_index',
                    component: () => import ('@/views/userPage/selfSkill-stepTwo.vue')
                },
                {
                    path: 'three',
                    title: 'three',
                    name: 'three_index',
                    component: () => import ('@/views/userPage/selfSkill-stepThree.vue')
                },
            ],
            component: () =>
                import ('@/views/userPage/selfSkills.vue')
        }]
    },
    {
        path: '/upload-photo',
        icon: 'android-person',
        name: 'upload-photo',
        access: '8',
        title: '头像上传页面',
        component: Main,
        children: [{
            path: 'index',
            title: '头像上传页面',
            name: 'upload-photo_index',
            component: () =>
                import ('@/views/userPage/upload-photo.vue')
        }]
    },
    {
        path: '/export',
        icon: 'images',
        name: 'export',
        access: '4',
        title: '生成PDF',
        component: Main,
        children: [{
            path: 'index',
            title: '生成PDF',
            name: 'export_index',
            component: () =>
                import ('@/views/userPage/exportPDF.vue')
        }]
    },
    {
        path: '/VIP-pay',
        icon: 'android-person',
        name: 'VIP-pay',
        access: '7',
        title: '会员支付页面',
        component: Main,
        children: [{
            path: 'index',
            title: '会员支付页面',
            name: 'VIP-pay_index',
            component: () =>
                import ('@/views/userPage/VIP-pay.vue')
        }]
    },
    {
        path: '/studentList',
        icon: 'android-person',
        name: 'studentList',
        access: '0',
        title: '学生列表',
        component: Main,
        children: [{
            path: 'index',
            title: '学生列表',
            name: 'studentList_index',
            component: () =>
                import ('@/views/userPage/studentList.vue')
        }]
    },
    {
        path: '/access',
        icon: 'key',
        name: 'access',
        title: '权限管理',
        component: Main,
        children: [{
            path: 'index',
            title: '权限管理',
            name: 'access_index',
            component: () =>
                import ('@/views/access/access.vue')
        }]
    },
    {
        path: '/access-test',
        icon: 'lock-combination',
        title: '权限测试页',
        name: 'accesstest',
        access: 0,
        component: Main,
        children: [{
            path: 'index',
            title: '权限测试页',
            name: 'accesstest_index',
            access: '0',
            component: () =>
                import ('@/views/access/access-test.vue')
        }]
    },
    {
        path: '/international',
        icon: 'earth',
        title: {
            i18n: 'international'
        },
        name: 'international',
        access: '0',
        component: Main,
        children: [{
            path: 'index',
            title: {
                i18n: 'international'
            },
            name: 'international_index',
            component: () =>
                import ('@/views/international/international.vue')
        }]
    },
    {
        path: '/component',
        icon: 'social-buffer',
        name: 'component',
        access: '0',
        title: '组件',
        component: Main,
        children: [{
                path: 'text-editor',
                icon: 'compose',
                name: 'text-editor',
                title: '富文本编辑器',
                component: () =>
                    import ('@/views/my-components/text-editor/text-editor.vue')
            },
            {
                path: 'md-editor',
                icon: 'pound',
                name: 'md-editor',
                title: 'Markdown编辑器',
                component: () =>
                    import ('@/views/my-components/markdown-editor/markdown-editor.vue')
            },
            {
                path: 'image-editor',
                icon: 'crop',
                name: 'image-editor',
                title: '图片预览编辑',
                component: () =>
                    import ('@/views/my-components/image-editor/image-editor.vue')
            },
            {
                path: 'draggable-list',
                icon: 'arrow-move',
                name: 'draggable-list',
                title: '可拖拽列表',
                component: () =>
                    import ('@/views/my-components/draggable-list/draggable-list.vue')
            },
            {
                path: 'area-linkage',
                icon: 'ios-more',
                name: 'area-linkage',
                title: '城市级联',
                component: () =>
                    import ('@/views/my-components/area-linkage/area-linkage.vue')
            },
            {
                path: 'file-upload',
                icon: 'android-upload',
                name: 'file-upload',
                title: '文件上传',
                component: () =>
                    import ('@/views/my-components/file-upload/file-upload.vue')
            },
            {
                path: 'scroll-bar',
                icon: 'android-upload',
                name: 'scroll-bar',
                title: '滚动条',
                component: () =>
                    import ('@/views/my-components/scroll-bar/scroll-bar-page.vue')
            },
            {
                path: 'count-to',
                icon: 'arrow-graph-up-right',
                name: 'count-to',
                title: '数字渐变',
                // component: () => import('@/views/my-components/count-to/count-to.vue')
                component: () =>
                    import ('@/views/my-components/count-to/count-to.vue')
            },
            {
                path: 'split-pane-page',
                icon: 'ios-pause',
                name: 'split-pane-page',
                title: 'split-pane',
                component: () =>
                    import ('@/views/my-components/split-pane/split-pane-page.vue')
            }
        ]
    },
    {
        path: '/form',
        icon: 'android-checkbox',
        name: 'form',
        access: '0',
        title: '表单编辑',
        component: Main,
        children: [{
                path: 'artical-publish',
                title: '文章发布',
                name: 'artical-publish',
                icon: 'compose',
                component: () =>
                    import ('@/views/form/article-publish/article-publish.vue')
            },
            {
                path: 'workflow',
                title: '工作流',
                name: 'workflow',
                icon: 'arrow-swap',
                component: () =>
                    import ('@/views/form/work-flow/work-flow.vue')
            }

        ]
    },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    //     ]
    // },
    {
        path: '/tables',
        icon: 'ios-grid-view',
        name: 'tables',
        access: '0',
        title: '表格',
        component: Main,
        children: [{
                path: 'dragableTable',
                title: '可拖拽排序',
                name: 'dragable-table',
                icon: 'arrow-move',
                component: () =>
                    import ('@/views/tables/dragable-table.vue')
            },
            {
                path: 'editableTable',
                title: '可编辑表格',
                name: 'editable-table',
                icon: 'edit',
                component: () =>
                    import ('@/views/tables/editable-table.vue')
            },
            {
                path: 'searchableTable',
                title: '可搜索表格',
                name: 'searchable-table',
                icon: 'search',
                component: () =>
                    import ('@/views/tables/searchable-table.vue')
            },
            {
                path: 'exportableTable',
                title: '表格导出数据',
                name: 'exportable-table',
                icon: 'code-download',
                component: () =>
                    import ('@/views/tables/exportable-table.vue')
            },
            {
                path: 'table2image',
                title: '表格转图片',
                name: 'table-to-image',
                icon: 'images',
                component: () =>
                    import ('@/views/tables/table-to-image.vue')
            }
        ]
    },
    {
        path: '/advanced-router',
        icon: 'ios-infinite',
        name: 'advanced-router',
        access: '0',
        title: '高级路由',
        component: Main,
        children: [{
                path: 'mutative-router',
                title: '动态路由',
                name: 'mutative-router',
                icon: 'link',
                component: () =>
                    import ('@/views/advanced-router/mutative-router.vue')
            },
            {
                path: 'argument-page',
                title: '带参页面',
                name: 'argument-page',
                icon: 'android-send',
                component: () =>
                    import ('@/views/advanced-router/argument-page.vue')
            }
        ]
    },
    {
        path: '/error-page',
        icon: 'android-sad',
        title: '错误页面',
        name: 'errorpage',
        access: '0',
        component: Main,
        children: [{
            path: 'index',
            title: '错误页面',
            name: 'errorpage_index',
            component: () =>
                import ('@/views/error-page/error-page.vue')
        }]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
    // userFrame
];