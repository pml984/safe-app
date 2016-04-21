import {connect} from 'react-redux'
import {MenuItem, SelectField} from 'material-ui'
import React, {Component, PropTypes} from 'react'

class VisualizationSelect extends Component {
  static propTypes = {
    style: PropTypes.object,
    visualization: PropTypes.string.isRequired,
    visualizations: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    style: {}
  }

  render () {
    const {
      style,
      visualization,
      visualizations,
      onChange
    } = this.props

    return (
      <SelectField
        floatingLabelText='Select a visualization'
        hintText='Select a visualization'
        style={style}
        value={visualization}
        onChange={onChange}
      >
        {visualizations.data.map((visualization) => (
          <MenuItem
            key={visualization._id}
            primaryText={visualization.name}
            value={visualization._id}
          />
        ))}
      </SelectField>
    )
  }
}

export default connect((state) => ({
  visualization: state.visualization,
  visualizations: state.visualizations
}))(VisualizationSelect)