import {connect} from 'react-redux'
import {sendMetrics} from '../modules/metrics'
import {header, main} from '../styles/common'
import React, {Component, PropTypes} from 'react'

class Settings extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, user} = this.props
    const event = {
      group: 'pageView',
      attributes: {
        page: 'Settings',
        user: user.data.username
      }
    }
    
    dispatch(sendMetrics([event]))
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