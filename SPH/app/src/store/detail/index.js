import { reqDetailInfo, reqAddorUpdateShopcart } from "@/api"
import { getUUID } from "@/utils/uuid_token"
export default {
    namespaced: true,
    actions: {
        async getDetailInfo({ commit }, skuId) {
            let result = await reqDetailInfo(skuId)
            // console.log(result);
            commit('GETDETAILINFO', result.data)
        },
        async AddorUpdateShopcart({ commit }, { skuId, skuNum }) {
            let result = await reqAddorUpdateShopcart(skuId, skuNum)
            //给promise绑定成功和失败的回调
            if (result.code == 200) {
                return 'ok'
            }
            else {
                return Promise.reject(new Error('faile'))
            }
            // console.log(result);
        }
    },
    mutations: {
        GETDETAILINFO(state, val) {
            state.detailList = val
        }
    },
    state: {
        detailList: {},
        uuid_token: getUUID()
    },
    getters: {
        categoryView(state) {
            return state.detailList.categoryView || {}

        },
        skuInfo(state) {
            return state.detailList.skuInfo || {}
        },
        spuSaleAttrList(state) {
            return state.detailList.spuSaleAttrList || []
        }



    }
}