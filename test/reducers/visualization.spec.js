/* globals describe, it */

import expect from 'expect'
import {
  SET_VISUALIZATION
} from '../../src/js/action-types'
import {
  visualization as reducer
} from '../../src/js/reducers'

describe('visualization reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = ''

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle SET_VISUALIZATION', () => {
    const stateAfter = 'VisualizationA'
    const action = {
      type: SET_VISUALIZATION,
      payload: {visualization: stateAfter}
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })
})