import { reqShopCartInfo, reqDeleteCartbyID, reqUpdateCart } from "@/api"
export default {
    namespaced: true,
    actions: {
        // 获取购物车信息
        async getShopCartInfo({ commit }) {
            let result = await reqShopCartInfo()
            // console.log(result);
            if (result.code == 200) {
                commit('GETSHOPCARTINFO', result.data)
            }

        },
        // 删除商品
        async deleteCartbyID({ commit }, skuId) {
            let result = await reqDeleteCartbyID(skuId)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 修改购物车商品状态
        async updateCartbyID({ commit }, { skuId, isChecked }) {
            // console.log(skuId, isChecked);
            let result = await reqUpdateCart(skuId, isChecked)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        }
    },
    mutations: {
        GETSHOPCARTINFO(state, value) {
            state.shopList = value
        }
    },
    state: {
        shopList: []
    },
    getters: {
        shopList(state) {
            return state.shopList[0] || []
        }
    }

}