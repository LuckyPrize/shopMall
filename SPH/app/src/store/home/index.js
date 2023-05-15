import { reqList, reqBannerList, reqFloorList } from "@/api";


export default {
    namespaced: true,
    actions: {
        async getList({ commit }) {
            const list = await reqList()
            commit('GETLIST', list)
        },
        async getBannerList({ commit }) {
            let result = await reqBannerList()
            commit('GETBANNERLIST', result)
        },
        async getFloorList({ commit }) {
            let result = await reqFloorList()
            commit('GETFLOORLIST', result)
        }
    },
    mutations: {
        GETLIST(state, value) {
            state.navList = value.data
        },
        GETBANNERLIST(state, value) {
            state.bannerList = value.data
        },
        GETFLOORLIST(state, value) {
            state.floorList = value.data
        }
    },
    state: {
        navList: [],
        bannerList: [],
        floorList: []
    },
    getters: {}
}