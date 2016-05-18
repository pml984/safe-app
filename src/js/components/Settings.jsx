import {connect} from 'react-redux'
import {metricsAccount} from '../../../config'
import {sendMetrics} from '../modules/metrics'
import {header, main} from '../styles/common'
import React, {Component, PropTypes} from 'react'

const event = {
  group: 'pageView',
  account: metricsAccount,
  attributes: {
    page: 'Settings'
  }
}

class Settings extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, user} = this.props
   
    event.attributes.user = user.data.username
    dispatch(sendMetrics(event))
  }
  
  render () {
    return (
      <div>
        <header style={header}>
          <h1>Settings</h1>
        </header>
        <main style={main}>
          <h3>Admin</h3>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  user: state.user
}))(Settings)