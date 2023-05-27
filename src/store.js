import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {
  productListReducer,
  productDetailsReducer,
  productTopRatedReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer,
  productCreateReviewReducer,
  productDeleteReviewReducer,
} from './reducers/productReducer'
import {
  userRegisterReducer,
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducer'
import {
  cartDetailsReducer,
  cartAddItemReducer,
  cartRemoveItemReducer,
  cartSetShippingAddressReducer,
} from './reducers/cartReducer'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducer'
import {
  addressCreateReducer,
  addressUpdateReducer,
  addressListReducer,
  addressDetailsReducer,
  addressRemoveReducer,
} from './reducers/addressReducer'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productTopRated: productTopRatedReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productCreateReview: productCreateReviewReducer,
  productDeleteReview: productDeleteReviewReducer,
  cartDetails: cartDetailsReducer,
  cartAddItem: cartAddItemReducer,
  cartRemoveItem: cartRemoveItemReducer,
  cartSetShippingAddress: cartSetShippingAddressReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  addressDetails: addressDetailsReducer,
  addressList: addressListReducer,
  addressCreate: addressCreateReducer,
  addressRemove: addressRemoveReducer,
  addressUpdate: addressUpdateReducer,
})

const userInfoLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const cartItemsLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
const shippingAddressLocalStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : null
const itemsPriceLocalStorage = localStorage.getItem('itemsPrice')
  ? JSON.parse(localStorage.getItem('itemsPrice'))
  : 0
const shippingPriceLocalStorage = localStorage.getItem('shippingPrice')
  ? JSON.parse(localStorage.getItem('shippingPrice'))
  : 0
const totalPriceLocalStorage = localStorage.getItem('totalPrice')
  ? JSON.parse(localStorage.getItem('totalPrice'))
  : 0

const addressListLocalStorage = localStorage.getItem('addressList')
  ? JSON.parse(localStorage.getItem('addressList'))
  : []

const initialState = {
  userLogin: { userInfo: userInfoLocalStorage },
  cartDetails: {
    cartItems: cartItemsLocalStorage,
    shippingAddress: shippingAddressLocalStorage,
    itemsPrice: itemsPriceLocalStorage,
    shippingPrice: shippingPriceLocalStorage,
    totalPrice: totalPriceLocalStorage,
  },
  addressList: {
    addresses: addressListLocalStorage,
  },
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
