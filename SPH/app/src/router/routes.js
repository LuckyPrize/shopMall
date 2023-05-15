import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
// import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import ShopCart from '@/pages/ShopCart'
import AddcartSuccess from '@/pages/AddCartSuccess'
import Trade from '@/pages/Trade'
import Pay from "@/pages/Pay"
import Paysuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
export default [
    {
        path: '/center',
        component: Center,
        meta: { showFooter: true },
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                path: '/',
                redirect: 'myorder'
            }

        ]
    },
    {
        path: '/paysuccess',
        component: Paysuccess,
        meta: { showFooter: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/pay') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { showFooter: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/home',
        component: Home,
        meta: { showFooter: true }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { showFooter: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddcartSuccess,
        meta: { showFooter: true }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: { showFooter: true }
    },
    {
        path: '/login',
        component: Login,
        meta: { showFooter: false }

    },
    {
        path: '/register',
        component: Register,
        meta: { showFooter: false }

    },
    {
        name: 'search',
        path: '/search/:keyword?',
        // 路由懒加载
        component: () => import('@/pages/Search'),
        meta: { showFooter: true }

    },
    {
        path: '/detail/:skuid',
        component: Detail,
    },
    {
        path: '/',
        redirect: '/home'
    }
]