import fetch from 'isomorphic-fetch'
import {
  FETCH_VISUALIZATIONS_REQUEST,
  FETCH_VISUALIZATIONS_SUCCESS
} from '../actionTypes'
import {apiUri} from '../../../config'

export const fetchVisualizationsSuccess = (json) => ({
  data: json,
  didInvalidate: false,
  isFetching: false,
  recievedAt: Date.now(),
  type: FETCH_VISUALIZATIONS_SUCCESS
})

export const fetchVisualizationsRequest = () => ({
  type: FETCH_VISUALIZATIONS_REQUEST
})

export const fetchVisualizations = (analytic) =>
  (dispatch) => {
    dispatch(fetchVisualizationsRequest())
    return fetch(`${apiUri}/analytics/${analytic}/visualizations`)
      .then((response) => response.json(), (err) => console.log(err))
      .then((json) => dispatch(fetchVisualizationsSuccess(json)))
  }