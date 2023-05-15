// 统一管理所有网络接口
import request from "./request";
import mockAjax from './mockAjax';
export const reqList = () => {
    return request({ url: '/product/getBaseCategoryList', method: 'GET' })
}
export const reqBannerList = () => {
    return mockAjax.get('/banner')
}
export const reqFloorList = () => {
    return mockAjax.get('/floor')
}
// 获取search模块数据
export const reqSearchInfo = (params) => request({ url: '/list', method: 'POST', data: params })

// 获取Detail模块数据
export const reqDetailInfo = (skuId) => request({ url: `/item/${skuId}`, method: 'GET' })
//通知服务器进行添加商品(或者进行数量更新)
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddorUpdateShopcart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' })
// 获取购物车模块数据
export const reqShopCartInfo = () => request({ url: '/cart/cartList', method: 'GET' })
// 删除购物车模块
// /api/cart/deleteCart/{skuId}
export const reqDeleteCartbyID = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })

// 修改购物车商品状态
// /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCart = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' })

// 登录注册模块
// 获取验证码
// url:/api/user/passport/sendCode/phone  method:get
export const reqUserCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })

// 提交注册
// url:/api/user/passport/register  method:post
export const reqRegister = (data) => request({ url: '/user/passport/register', data: data, method: 'POST' })

// 登录模块
// url:/api/user/passport/login   method:post
export const reqLogin = (data) => request({ url: '/user/passport/login', data, method: 'POST' })

// 获取用户信息
// url:/api/user/passport/auth/getUserInfo  method:get
export const reqUserInfo = () => request({ url: '/user/passport/auth/getUserInfo', method: 'GET' })

// 退出登录
// url:/api/user/passport/logout   method:get
export const reqLogout = () => request({ url: '/user/passport/logout', method: 'GET' })

// 获取订单页信息
// url:/api/order/auth/trade   method:get
export const reqTrade = () => request({ url: '/order/auth/trade ', method: 'GET' })

//获取提交订单的接口
// url：/api/order/auth/submitOrder?tradeNo={tradeNo}   method:post
export const reqsubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data: data, method: 'POST' })

// 获取订单支付信息
// url:/api/payment/weixin/createNative/{orderId}   method:get
export const reqOrderPay = (orderId) => request({ url: `/payment/weixin/createNative/${orderId} `, method: 'GET' })

// 查询订单支付状态
// url: /api/payment/weixin/queryPayStatus/{orderId}  method:get
export const reqPaysuccess = (orderId) => request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'GET' })

// 获取个人中心我的订单详情
// url:/api/order/auth/{page}/{limit}   method:get
export const reqMyorder = (page, limit) => request({ url: `/order/auth/${page}/${limit}`, method: 'GET' })