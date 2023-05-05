import axios from 'axios'
import {
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAIL,
  CART_DETAILS_RESET,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  CART_SET_SHIPPING_ADDRESS_REQUEST,
  CART_SET_SHIPPING_ADDRESS_SUCCESS,
  CART_SET_SHIPPING_ADDRESS_FAIL,
} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_ADD_ITEM_REQUEST })

    const { data: product } = await axios.get(`/api/product/${id}`)

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const itemDetails = {
      product: product._id,
      name: product.name,
      price: product.price,
      countInStock: product.countInStock,
      image: product.image,
      qty: Number(qty),
    }

    const { data: item } = await axios.post('/api/cart', itemDetails, config)

    await dispatch({
      type: CART_ADD_ITEM_SUCCESS,
      payload: {
        product: item.product,
        name: item.name,
        price: item.price,
        countInStock: item.countInStock,
        image: item.image,
        qty: Number(qty),
      },
    })

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cartDetails.cartItems)
    )
  } catch (error) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message,
    })
  }
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_REMOVE_ITEM_REQUEST })
    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.delete(`/api/cart/item/${id}`, config)

    dispatch({
      type: CART_REMOVE_ITEM_SUCCESS,
      payload: data,
    })

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cartDetails.cartItems)
    )
  } catch (error) {
    dispatch({
      type: CART_REMOVE_ITEM_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message,
    })
  }
}

export const getCartDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_DETAILS_REQUEST })
    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get('/api/cart', config)

    dispatch({
      type: CART_DETAILS_SUCCESS,
      payload: data,
    })

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cartDetails.cartItems)
    )

    if (data.itemsPrice && data.itemsPrice !== 0) {
      localStorage.setItem(
        'itemsPrice',
        JSON.stringify(getState().cartDetails.itemsPrice)
      )
      localStorage.setItem(
        'shippingPrice',
        JSON.stringify(getState().cartDetails.shippingPrice)
      )
      localStorage.setItem(
        'totalPrice',
        JSON.stringify(getState().cartDetails.totalPrice)
      )
    }
    if (data.shippingAddress) {
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify(getState().cartDetails.shippingAddress)
      )
    } else {
      localStorage.removeItem('shippingAddress')
    }
  } catch (error) {
    dispatch({
      type: CART_DETAILS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message,
    })
  }
}

export const setShippingAddress = (addressId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_SET_SHIPPING_ADDRESS_REQUEST,
    })
    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.put(
      '/api/cart/shippingAddress',
      { addressId },
      config
    )
    dispatch({
      type: CART_SET_SHIPPING_ADDRESS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CART_SET_SHIPPING_ADDRESS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message,
    })
  }
}

export const resetCart = () => (dispatch) => {
  dispatch({ type: CART_DETAILS_RESET })
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('itemsPrice')
  localStorage.removeItem('shippingPrice')
  localStorage.removeItem('totalPrice')
}
