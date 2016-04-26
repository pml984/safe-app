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
      series: [{
        name: 'city',
        colorByPoint: true,
        data: [
          {name: 'Littleton', y: 2},
          {name: 'Denver', y: 2},
          {name: 'Aurora', y: 1},
          {name: 'Golden', y: 1}
        ]
      }],
      title: {
        text: 'Unique count of CITY'
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
      drilldown: {},
      legend: {},
      plotOptions: {},
      series: [],
      subtitle: {},
      title: {
        text: ''
      },
      tooltip: {},
      xAxis: {},
      yAxis: {}
    }

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle SET', () => {
    const stateAfter = {
      series: [{
        name: 'city',
        colorByPoint: true,
        data: [
          {name: 'Littleton', y: 2},
          {name: 'Denver', y: 2},
          {name: 'Aurora', y: 1},
          {name: 'Golden', y: 1}
        ]
      }],
      title: {
        text: 'Unique count of CITY'
      }
    }
    
    const action = {
      type: SET,
      payload: {barChart: stateAfter}
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })
})