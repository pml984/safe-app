/* globals afterEach, describe, it */

import {apiUri} from '../../config.js'
import configureStore from 'redux-mock-store'
import expect from 'expect'
import nock from 'nock'
import thunk from 'redux-thunk'
import {
  FAILURE,
  fetchAnalytics,
  fetchAnalyticsFailure,
  fetchAnalyticsRequest,
  fetchAnalyticsSuccess,
  default as reducer,
  REQUEST,
  SUCCESS
} from '../../src/js/modules/analytics'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const source = 'SourceA'

describe('analytics actions', () => {
  describe('sync actions', () => {
    it('fetchAnalyticsFailure should create a FAILURE action', () => {
      const error = new Error('test error')
      const expectedAction = {
        payload: {error},
        type: FAILURE
      }

      expect(fetchAnalyticsFailure(error)).toEqual(expectedAction)
    })

    it('fetchAnalyticsRequest should create a REQUEST action', () => {
      const expectedAction = {
        type: REQUEST
      }

      expect(fetchAnalyticsRequest()).toEqual(expectedAction)
    })

    it('fetchAnalyticsSuccess should create a SUCCESS action', () => {
      const expectedAction = {
        payload: {data: []},
        recievedAt: null,
        type: SUCCESS
      }
      const action = fetchAnalyticsSuccess([])

      expectedAction.recievedAt = action.recievedAt

      expect(action).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('fetchAnalytics creates a SUCCESS action on success', (done) => {
      nock(apiUri)
        .get(`/sources/${source}/analytics`)
        .reply(200, [{_id: '1', name: 'AnalyticA'}, {_id: '2', name: 'AnalyticB'}])

      const initialState = {
        analytics: []
      }
      const requestAction = {
        type: REQUEST
      }
      const recieveAction = {
        type: SUCCESS,
        payload: {
          data: [
            {_id: '1', name: 'AnalyticA'},
            {_id: '2', name: 'AnalyticB'}
          ]
        },
        recievedAt: null
      }
      const store = mockStore(initialState)

      store.dispatch(fetchAnalytics(source))
        .then(() => {
          const actions = store.getActions()
          const expectedActions = [
            requestAction,
            recieveAction
          ]

          expectedActions[1].recievedAt = actions[1].recievedAt

          expect(actions).toEqual(expectedActions)
          done()
        })
    })

    it('fetchAnalytics creates a FAILURE action on failure', (done) => {
      nock(apiUri)
        .get(`/sources/${source}/analytics`)
        .reply(500)

      const error = new Error('NetworkError')
      const initialState = {
        analytics: []
      }
      const requestAction = {
        type: REQUEST
      }
      const failureAction = {
        payload: {error},
        type: FAILURE
      }
      const store = mockStore(initialState)

      store.dispatch(fetchAnalytics(source))
        .then(() => {
          const actions = store.getActions()
          const expectedActions = [
            requestAction,
            failureAction
          ]

          expectedActions[1].payload.error = actions[1].payload.error

          expect(actions).toEqual(expectedActions)
          done()
        })
    })
  })
})

describe('analytics reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {
      data: [],
      error: undefined,
      isFetching: false,
      lastUpdated: null
    }

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle FAILURE', () => {
    const error = new Error('test error')
    const action = {
      payload: {error},
      type: FAILURE
    }
    const stateAfter = {
      data: [],
      error,
      isFetching: false,
      lastUpdated: null
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle REQUEST', () => {
    const action = {
      type: REQUEST
    }
    const stateAfter = {
      data: [],
      error: undefined,
      isFetching: true,
      lastUpdated: null
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle SUCCESS', () => {
    const data = ['AnalyticA', 'AnalyticB']
    const action = {
      payload: {data},
      recievedAt: Date.now(),
      type: SUCCESS
    }
    const result = reducer(undefined, action)
    const expectedValue = {
      data,
      error: undefined,
      isFetching: false,
      lastUpdated: result.lastUpdated
    }

    expect(result).toEqual(expectedValue)
  })
})