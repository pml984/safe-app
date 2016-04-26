export const SET = 'safe-app/bar-chart/SET'

export const setBarChart = (barChart) => ({
  type: SET,
  payload: {barChart}
})

const initialState = {
  drilldown: {},
  legend: {},
  plotOptions: {},
  series: [],
  subtitle: {},
  title: {},
  tooltip: {},
  xAxis: {},
  yAxis: {}
}

export default (state = initialState, {payload = {}, type, ...action}) => {
  const {barChart} = payload

  switch (type) {
    case SET:
      return barChart
    default:
      return state
  }
}