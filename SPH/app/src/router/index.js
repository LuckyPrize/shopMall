import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from './routes'
import store from '@/store'

let orginPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        orginPush.call(this, location, resolve, reject)
    } else {
        orginPush.call(this, location, () => { }, () => { })
    }
}
let orginReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        orginReplace.call(this, location, resolve, reject)
    } else {
        orginReplace.call(this, location, () => { }, () => { })
    }
}

let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { y: 0 }
    }
});
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    // console.log(token);
    let name = store.state.user.userInfo.name
    if (token) {
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch('user/getUserInfo')
                    next()
                } catch (error) {
                    try {
                        await store.dispatch('user/userLogout')
                        next('/login')
                    } catch (error) {
                        alert(error.message)
                    }
                }
            }
        }
    }
    else {
        if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1) {
            next('/login?redirect=' + to.path)
        }
        else {
            next()
        }

    }
})



export default router