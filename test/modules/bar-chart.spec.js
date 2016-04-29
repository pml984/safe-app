/* globals describe, it */

import expect from 'expect'
import {
  default as reducer,
  SET,
  setBarChart
} from '../../src/js/modules/bar-chart'

describe('barChart actions', () => {
  it('setBarChart should create a SET action', () => {
    const barChart = {
      data: {
        data: [
          {name: 'Littleton', y: 2},
          {name: 'Denver', y: 2},
          {name: 'Aurora', y: 1},
          {name: 'Golden', y: 1}
        ],
        xAxis: [{
          dataProperty: 'name'
        }],
        yAxis: [{
          dataProperty: 'y',
          label: 'Count'
        }]
      },
      options: {
        title: {
          text: 'Unique count of CITY'
        },
        scales: {
          xAxis: [{
            scaleLabel: {
              display: true
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true
            }
          }]
        }
      }
    }
    
    const expectedAction = {
      type: SET,
      payload: {barChart}
    }

    expect(setBarChart(barChart)).toEqual(expectedAction)
  })
})

describe('barChart reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {
      data: {},
      options: {}
    }

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle SET', () => {
    const stateAfter = {
      data: {
        data: [
          {name: 'Littleton', y: 2},
          {name: 'Denver', y: 2},
          {name: 'Aurora', y: 1},
          {name: 'Golden', y: 1}
        ],
        xAxis: [{
          dataProperty: 'name'
        }],
        yAxis: [{
          dataProperty: 'y',
          label: 'Count'
        }]
      },
      options: {
        title: {
          text: 'Unique count of CITY'
        },
        scales: {
          xAxis: [{
            scaleLabel: {
              display: true
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true
            }
          }]
        }
      }
    }
      
    const action = {
      type: SET,
      payload: {barChart: stateAfter}
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })
})