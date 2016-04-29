export const SET = 'safe-app/bar-chart/SET'

export const setBarChart = (barChart) => ({
  type: SET,
  payload: {barChart}
})

const initialState = {
  data: {},
  options: {}
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