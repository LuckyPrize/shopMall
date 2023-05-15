import { reqUserCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from "@/api"
import { getToken, removeToken, setToken } from "@/utils/token";
export default {
    namespaced: true,
    actions: {
        // 获取验证码
        async getCode({ commit }, phone) {
            let result = await reqUserCode(phone)
            // console.log(result);
            if (result.code == 200) {
                commit('GETCODE', result.data)
                return 'ok'
            }
            else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 提交注册
        async getRegister({ commit }, data) {
            let result = await reqRegister(data)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 用户登录
        async userLogin({ commit }, data) {
            let result = await reqLogin(data)
            // console.log(result);
            if (result.code == 200) {
                commit('USERLOGIN', result.data)
                setToken(result.data.token)
                return 'ok'
            }
            else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 获取用户登录信息
        async getUserInfo({ commit }) {
            let result = await reqUserInfo()
            // console.log(result);
            if (result.code == 200) {
                commit('GETUSERINFO', result.data)
                return 'ok'
            }
        },
        // 退出登录
        async userLogout({ commit }) {
            let result = await reqLogout()
            // console.log(result);
            if (result.code == 200) {
                commit('CLEAR')
                return 'ok'
            }
            else {
                return Promise.reject(new Error('faile'))
            }
        }
    },
    mutations: {
        GETCODE(state, code) {
            state.code = code
        },
        USERLOGIN(state, data) {
            state.token = data.token

        },
        GETUSERINFO(state, userInfo) {
            state.userInfo = userInfo
        },
        CLEAR(state) {
            state.token = '',
                state.userInfo = {}
            removeToken()
        }
    },
    state: {
        code: '',
        token: getToken(),
        userInfo: {}
    },
    getters: {}
}