/* global describe, it */

import expect from 'expect'
import {
  RESET_UPLOAD_DATA_TYPES,
  SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME,
  SET_UPLOAD_DATA_TYPES
} from '../../src/js/action-types'
import {
  uploadDataTypes as reducer
} from '../../src/js/reducers'

describe('upload reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {}

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle SET_UPLOAD_DATA_TYPES', () => {
    const uploadDataTypes = {
      columnName1: 'type1',
      columnName2: 'type2'
    }
    const action = {
      payload: {uploadDataTypes},
      type: SET_UPLOAD_DATA_TYPES
    }
    const result = reducer(undefined, action)
    const stateAfter = uploadDataTypes
    expect(result).toEqual(stateAfter)
  })

  it('should update state for SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME', () => {
    const stateBefore = {
      columnName1: 'type1',
      columnName2: 'type2'
    }
    const stateAfter = {
      columnName1: 'type1',
      columnName2: 'type3'
    }
    const action = {
      payload: {header: 'columnName2', value: 'type3'},
      type: SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME
    }

    const result = reducer(stateBefore, action)

    expect(result).toEqual(stateAfter)
  })

  it('should reset upload data types from RESET_UPLOAD_DATA_TYPES', () => {
    const stateBefore = {
      columnName1: 'type1',
      columnName2: 'type2'
    }
    const action = {
      type: RESET_UPLOAD_DATA_TYPES
    }

    const result = reducer(stateBefore, action)

    expect(result).toEqual({})
  })
})