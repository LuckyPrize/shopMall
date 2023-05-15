import { reqTrade } from "@/api"

export default {
    namespaced: true,
    actions: {
        async getTrade({ commit }) {
            let result = await reqTrade()
            // console.log(result);
            if (result.code == 200) {
                commit('GETTRADE', result.data)
            }

        }
    },
    mutations: {
        GETTRADE(state, data) {
            state.userAddress = data.userAddressList
            state.detailOrders = data.detailArrayList
            state.tradeNo = data.tradeNo
        }
    },
    state: {
        userAddress: [],
        detailOrders: [],
        tradeNo: ''
    },
    getters: {}
}