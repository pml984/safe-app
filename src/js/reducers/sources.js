import {List, Map} from 'immutable'
import {
  // FETCH_SOURCES_FAILURE,
  FETCH_SOURCES_REQUEST,
  FETCH_SOURCES_SUCCESS
} from '../action-types'

const initialState = Map({
  data: List(),
  didInvalidate: false,
  isFetching: false,
  lastUpdated: null
})

export default (state = initialState, action) => {
  const {data} = action.payload || {}

  switch (action.type) {
    case FETCH_SOURCES_SUCCESS:
      return state.merge({
        data,
        didInvalidate: false,
        isFetching: false,
        lastUpdated: action.recievedAt
      })
    case FETCH_SOURCES_REQUEST:
      return state.merge({
        didInvalidate: false,
        isFetching: true
      })
    default:
      return state
  }
}