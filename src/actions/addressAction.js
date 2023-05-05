import axios from 'axios'
import {
  ADDRESS_CREATE_REQUEST,
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_CREATE_FAIL,
  ADDRESS_DETAILS_REQUEST,
  ADDRESS_DETAILS_SUCCESS,
  ADDRESS_DETAILS_FAIL,
  ADDRESS_LIST_REQUEST,
  ADDRESS_LIST_SUCCESS,
  ADDRESS_LIST_FAIL,
  ADDRESS_LIST_RESET,
  ADDRESS_UPDATE_REQUEST,
  ADDRESS_UPDATE_SUCCESS,
  ADDRESS_UPDATE_FAIL,
  ADDRESS_REMOVE_FAIL,
  ADDRESS_REMOVE_REQUEST,
  ADDRESS_REMOVE_SUCCESS,
} from '../constants/addressConstants'

export const createAddress = (addressData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADDRESS_CREATE_REQUEST,
    })

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post('/api/address', addressData, config)

    dispatch({
      type: ADDRESS_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADDRESS_CREATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.stack
          : error.message,
    })
  }
}

export const listMyAddress = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADDRESS_LIST_REQUEST })
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

    const { data } = await axios.get('/api/address/myaddress', config)

    dispatch({
      type: ADDRESS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADDRESS_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message,
    })
  }
}

export const getAddressDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADDRESS_DETAILS_REQUEST })

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

    const { data } = await axios.get(`/api/address/${id}`, config)

    dispatch({
      type: ADDRESS_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADDRESS_DETAILS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message,
    })
  }
}

export const removeAddress = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADDRESS_REMOVE_REQUEST })

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

    const { data } = await axios.delete(`/api/address/${id}`, config)

    dispatch({
      type: ADDRESS_REMOVE_SUCCESS,
      payload: data,
    })

    if (data.isMain) {
      localStorage.removeItem('mainAddress')
    }
  } catch (error) {
    dispatch({
      type: ADDRESS_REMOVE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message,
    })
  }
}

export const updateAddress =
  (id, addressData) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADDRESS_UPDATE_REQUEST })
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
        `/api/address/${id}`,
        addressData,
        config
      )

      dispatch({
        type: ADDRESS_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ADDRESS_UPDATE_FAIL,
        payload:
          error.response && error.response.message
            ? error.response.message
            : error.message,
      })
    }
  }

export const setMainAddress = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADDRESS_UPDATE_REQUEST,
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
      `/api/address/${id}`,
      { isMain: true },
      config
    )

    dispatch({
      type: ADDRESS_UPDATE_SUCCESS,
      payload: data,
    })

    localStorage.setItem('mainAddress', JSON.stringify(data._id))
  } catch (error) {
    dispatch({
      type: ADDRESS_UPDATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message,
    })
  }
}

export const resetAddress = () => (dispatch) => {
  dispatch({ type: ADDRESS_LIST_RESET })
  localStorage.removeItem('mainAddress')
}

export const getMainAddress = () => async (dispatch, getState) => {
  const {
    userLogin: {
      userInfo: { token },
    },
  } = getState()

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }

  const { data } = await axios.get('/api/address/main', config)

  if (data._id) {
    localStorage.setItem('mainAddress', JSON.stringify(data._id))
  }
}
