import CircularProgress from 'material-ui/CircularProgress'
import MaterialSelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import React, {PropTypes} from 'react'

const style = {
  progress: {
    left: '-15px',
    top: '-15px'
  }
}
const progress = (
  <CircularProgress
    size={0.2}
    style={style.progress}
  />
)

export const SelectField = (props) => {
  const {
    errorText,
    hintText,
    isFetching,
    items,
    keyProp,
    primaryTextProp,
    style,
    value,
    valueProp,
    onChange
  } = props

  const text = isFetching
    ? progress
    : hintText

  return (
    <MaterialSelectField
      disabled={isFetching}
      errorText={errorText}
      floatingLabelStyle={{pointerEvents: 'none'}}
      floatingLabelText={text}
      items={items}
      style={style}
      value={value}
      onChange={onChange}
    >
      {
        items.map((item) => (
          <MenuItem
            key={item[keyProp]}
            primaryText={item[primaryTextProp]}
            value={item[valueProp]}
          />
        ))
      }
    </MaterialSelectField>
  )
}

SelectField.propTypes = {
  errorText: PropTypes.node,
  floatingLabelText: PropTypes.string,
  hintText: PropTypes.string,
  isFetching: PropTypes.bool,
  items: PropTypes.array.isRequired,
  keyProp: PropTypes.string.isRequired,
  primaryTextProp: PropTypes.string.isRequired,
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
  valueProp: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

SelectField.defaultProps = {
  isFetching: false,
  style: {},
  floatingLabelText: 'Select a field',
  hintText: 'Select a field'
}