import { reqSearchInfo } from "@/api"

export default {
    namespaced: true,
    actions: {
        async getSearchList({ commit }, params = {}) {
            let result = await reqSearchInfo(params)
            if (result.code == 200) {
                commit('GETSEARCHLIST', result.data)
                // console.log(result.data);
            }
        }

    },
    mutations: {
        GETSEARCHLIST(state, value) {
            state.searchList = value
        }
    },
    state: {
        searchList: {}
    },
    getters: {
        goodsList(state) {
            return state.searchList.goodsList || []
        },
        attrsList(state) {
            return state.searchList.attrsList || []
        },
        trademarkList(state) {
            return state.searchList.trademarkList || []
        },
    }
}