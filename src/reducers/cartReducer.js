import {
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAIL,
  CART_DETAILS_RESET,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_RESET,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  CART_REMOVE_ITEM_RESET,
  CART_SET_SHIPPING_ADDRESS_REQUEST,
  CART_SET_SHIPPING_ADDRESS_SUCCESS,
  CART_SET_SHIPPING_ADDRESS_FAIL,
  CART_SET_SHIPPING_ADDRESS_RESET,
} from '../constants/cartConstants'

export const cartDetailsReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case CART_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CART_DETAILS_SUCCESS:
      return {
        loading: false,
        cartItems: payload.cartItems,
        shippingAddress: payload.shippingAddress || null,
        itemsPrice: payload.itemsPrice,
        shippingPrice: payload.shippingPrice,
        totalPrice: payload.totalPrice,
      }
    case CART_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case CART_DETAILS_RESET:
      return {}
    default:
      return state
  }
}

export const cartAddItemReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case CART_ADD_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CART_ADD_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
        item: payload,
      }
    case CART_ADD_ITEM_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case CART_ADD_ITEM_RESET:
      return {}
    default:
      return state
  }
}

export const cartRemoveItemReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case CART_REMOVE_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CART_REMOVE_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
        item: payload,
      }
    case CART_REMOVE_ITEM_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case CART_REMOVE_ITEM_RESET:
      return {}
    default:
      return state
  }
}

export const cartSetShippingAddressReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case CART_SET_SHIPPING_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CART_SET_SHIPPING_ADDRESS_SUCCESS:
      return {
        loading: false,
        success: true,
        shippingAddress: payload,
      }
    case CART_SET_SHIPPING_ADDRESS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case CART_SET_SHIPPING_ADDRESS_RESET:
      return {}
    default:
      return state
  }
}

// export const cartReducer = (state = {}, action) => {
//   const { type, payload } = action

//   switch (type) {
//     case CART_ADD_ITEM:
//       const item = payload
//       const itemExists = state.cartItems.find((x) => x.product === item.product)

//       if (itemExists) {
//         return {
//           ...state,
//           cartItems: state.cartItems.map((x) =>
//             x.product === item.product ? item : x
//           ),
//         }
//       } else {
//         return {
//           ...state,
//           cartItems: [item, ...state.cartItems],
//         }
//       }
//     case CART_REMOVE_ITEM:
//       return {
//         ...state,
//         cartItems: payload,
//       }
//     case CART_RESET:
//       return {}
//     case CART_LOAD:
//       return {
//         ...state,
//         cartItems: payload.cartItems,
//         shippingAddress: payload.shippingAddress || {},
//       }
//     case 'CART_LOAD_FAIL':
//       return {
//         ...state,
//         error: payload,
//       }
//     case CART_SET_SHIPPING_ADDRESS_REQUEST:
//       return {
//         ...state,
//         shippingAddress: {},
//         loading: true,
//       }
//     case CART_SET_SHIPPING_ADDRESS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         success: true,
//         shippingAddress: payload,
//       }
//     case CART_SET_SHIPPING_ADDRESS_FAIL:
//       return {
//         loading: false,
//         error: payload,
//       }
//     default:
//       return state
//   }
// }
