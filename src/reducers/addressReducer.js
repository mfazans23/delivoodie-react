import {
  ADDRESS_DETAILS_REQUEST,
  ADDRESS_DETAILS_SUCCESS,
  ADDRESS_DETAILS_FAIL,
  ADDRESS_DETAILS_RESET,
  ADDRESS_LIST_REQUEST,
  ADDRESS_LIST_SUCCESS,
  ADDRESS_LIST_FAIL,
  ADDRESS_CREATE_REQUEST,
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_CREATE_FAIL,
  ADDRESS_CREATE_RESET,
  ADDRESS_REMOVE_REQUEST,
  ADDRESS_REMOVE_SUCCESS,
  ADDRESS_REMOVE_FAIL,
  ADDRESS_REMOVE_RESET,
  ADDRESS_UPDATE_REQUEST,
  ADDRESS_UPDATE_SUCCESS,
  ADDRESS_UPDATE_FAIL,
  ADDRESS_UPDATE_RESET,
} from '../constants/addressConstants'

export const addressListReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case ADDRESS_LIST_REQUEST:
      return { loading: true }
    case ADDRESS_LIST_SUCCESS:
      return { loading: false, addresses: payload }
    case ADDRESS_LIST_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const addressDetailsReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case ADDRESS_DETAILS_REQUEST:
      return { loading: true }
    case ADDRESS_DETAILS_SUCCESS:
      return {
        loading: false,
        address: payload,
      }
    case ADDRESS_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ADDRESS_DETAILS_RESET:
      return {}
    default:
      return state
  }
}

export const addressCreateReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case ADDRESS_CREATE_REQUEST:
      return { loading: true }
    case ADDRESS_CREATE_SUCCESS:
      return { loading: false, success: true, address: payload }
    case ADDRESS_CREATE_FAIL:
      return { loading: false, error: payload }
    case ADDRESS_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const addressRemoveReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case ADDRESS_REMOVE_REQUEST:
      return { loading: true }
    case ADDRESS_REMOVE_SUCCESS:
      return { loading: false, success: true, address: payload }
    case ADDRESS_REMOVE_FAIL:
      return { loading: false, error: payload }
    case ADDRESS_REMOVE_RESET:
      return {}
    default:
      return state
  }
}

export const addressUpdateReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case ADDRESS_UPDATE_REQUEST:
      return { loading: true }
    case ADDRESS_UPDATE_SUCCESS:
      return { loading: false, success: true, address: payload }
    case ADDRESS_UPDATE_FAIL:
      return { loading: false, error: payload }
    case ADDRESS_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
