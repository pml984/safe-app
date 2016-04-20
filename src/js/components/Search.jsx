import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Hydrateable} from '../decorators'
import FilterCriteria from './FilterCriteria'
import {SelectField} from './SelectField'
import SourceSelect from './SourceSelect'
import {BarChart, BasicDataTable, Map} from 'safe-framework'
import {RaisedButton, Tabs, Tab} from 'material-ui'
import {fetchFields} from '../modules/fields'
import {addFilter, editFilter, removeFilter} from '../modules/filters'
import {fetchSearchResults} from '../modules/search-results'
import {setSource} from '../modules/source'
import {fetchSources} from '../modules/sources'
import {setCategory} from '../modules/category'
import {setLabel} from '../modules/label'
import {setLatitude} from '../modules/latitude'
import {setLongitude} from '../modules/longitude'
import {setMapResults} from '../modules/map-results'
import {header, main} from '../styles/common'

const style = {
  hidden: {
    display: 'none'
  },
  sourceSelect: {
    display: 'block'
  },
  button: {
    margin: '1.5em 0'
  },
  verticalTop: {
    verticalAlign: 'top'
  },
  margin: {
    margin: 12
  }
}

const mapTitle = 'Cities'
const size = 'col-xs-12 col-sm-12'
const zoomControlPosition = 'topleft'
const chartTitle = 'Cities in Colorado'
const chartSeries = [{
  name: 'Cities',
  colorByPoint: true,
  data: [{
    name: 'Littleton',
    y: 2
  }, {
    name: 'Denver',
    y: 2
  }, {
    name: 'Aurora',
    y: 1
  }, {
    name: 'Golden',
    y: 1
  }]
}]
const chartDrilldown = {}

@Hydrateable('Search', ['filters', 'source'])
class Search extends Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,
    mapResults: PropTypes.object,
    searchResults: PropTypes.object.isRequired,
    source: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.displayName = 'Search'

    this.onAddFilter = ::this.onAddFilter
    this.onChangeCategory = ::this.onChangeCategory
    this.onChangeField = ::this.onChangeField
    this.onChangeLabel = ::this.onChangeLabel
    this.onChangeLatitude = ::this.onChangeLatitude
    this.onChangeLongitude = ::this.onChangeLongitude
    this.onChangeOperator = ::this.onChangeOperator
    this.onChangeSource = ::this.onChangeSource
    this.onChangeValue = ::this.onChangeValue
    this.onClickDashboard = ::this.onClickDashboard
    this.onClickPlot = ::this.onClickPlot
    this.onClickSearch = ::this.onClickSearch
    this.onRemoveFilter = ::this.onRemoveFilter
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(fetchSources())
  }

  onAddFilter (ev) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(addFilter({
      field: '',
      operator: '',
      value: ''
    }))
  }

  onChangeCategory (ev, index, category) {
    const {dispatch} = this.props

    dispatch(setCategory(category))
  }

  onChangeField (index, field) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {field}))
  }

  onChangeLabel (ev, index, label) {
    const {dispatch} = this.props

    dispatch(setLabel(label))
  }

  onChangeLatitude (ev, index, latitude) {
    const {dispatch} = this.props

    dispatch(setLatitude(latitude))
  }

  onChangeLongitude (ev, index, longitude) {
    const {dispatch} = this.props

    dispatch(setLongitude(longitude))
  }

  onChangeOperator (index, operator) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {operator}))
  }

  onChangeSource (ev, index, source) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(setSource(source))
    dispatch(fetchFields(source))
  }

  onChangeValue (index, value) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {value}))
  }

  onClickDashboard () {
    console.log('Add to Dashboard clicked')
  }

  onClickPlot () {
    const {dispatch, label, latitude, longitude, searchResults} = this.props

    // Verify selected fields contain lat/lon values
    const lat = searchResults.data[0][latitude]
    const long = searchResults.data[0][longitude]

    if (
      Number(lat) !== lat ||
      Number(long) !== long ||
      lat < -90 ||
      lat > 90 ||
      long < -180 ||
      long > 180
    ) {
      return
    }

    const markers = searchResults.data.map((row, i) => ({
      key: i,
      position: [row[latitude], row[longitude]],
      children: row[label.toLowerCase()]
    }))

    const mapResults = {
      center: [lat, long],
      markers: markers
    }

    dispatch(setMapResults(mapResults))
  }

  onClickSearch () {
    const {dispatch, source, filters} = this.props

    dispatch(fetchSearchResults(source, filters))
  }

  onRemoveFilter (ev, index) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(removeFilter(index))
  }

  render () {
    const {category, label, latitude, longitude, mapResults, searchResults, source} = this.props
    const filterStyle = source === ''
      ? style.hidden
      : {}

    return (
      <div>
        <header style={header}>
          <h1>Search</h1>
        </header>
        <main style={main}>
          <SourceSelect
            style={{
              ...style.verticalTop,
              ...style.sourceSelect
            }}
            onChange={this.onChangeSource}
          />
          <FilterCriteria
            style={style.verticalTop}
            wrapperStyle={filterStyle}
            onAdd={this.onAddFilter}
            onChangeField={this.onChangeField}
            onChangeOperator={this.onChangeOperator}
            onChangeValue={this.onChangeValue}
            onRemove={this.onRemoveFilter}
          />
          <div>
            <RaisedButton
              disabled={!source}
              label='Search'
              primary={true}
              style={style.button}
              onTouchTap={this.onClickSearch}
            />
            <RaisedButton
              disabled={!source}
              label='Add to Dashboard'
              style={style.margin}
              onTouchTap={this.onClickDashboard}
            />
          </div>
          {(() => {
            if (searchResults.data && searchResults.data.length > 0) {
              const columns = Object.keys(searchResults.data[0]).map((data) => ({
                title: data.toUpperCase(),
                data
              }))

              const items = Object.keys(searchResults.data[0]).map((data, i) => ({
                value: i,
                primaryText: data
              }))

              const lat = searchResults.data[0][latitude]
              const long = searchResults.data[0][longitude]

              const isValidLatitude = latitude.length === 0 || (Number(lat) === lat && lat > -90 && lat < 90)
              const isValidLongitude = longitude.length === 0 || (Number(long) === long && long > -180 && long < 180)

              return (
                <div className={size}>
                  <Tabs>
                    <Tab label='Data'>
                      <BasicDataTable
                        columns={columns}
                        data={searchResults.data}
                      />
                    </Tab>
                    <Tab label='Map'>
                      <div>
                        <SelectField
                          errorText={!isValidLatitude && 'Select a latitude field'}
                          floatingLabelText='Select a Latitude'
                          hintText='Select a Latitude'
                          items={items}
                          style={style.verticalTop}
                          value={latitude}
                          onChange={this.onChangeLatitude}
                        />
                        <SelectField
                          errorText={!isValidLongitude && 'Select a longitude field'}
                          floatingLabelText='Select a Longitude'
                          hintText='Select a Longitude'
                          items={items}
                          style={style.verticalTop}
                          value={longitude}
                          onChange={this.onChangeLongitude}
                        />
                        <SelectField
                          floatingLabelText='Select a Label'
                          hintText='Select a label'
                          items={items}
                          style={style.verticalTop}
                          value={label}
                          onChange={this.onChangeLabel}
                        />
                        <RaisedButton
                          label='Plot'
                          primary={true}
                          style={style.button}
                          onTouchTap={this.onClickPlot}
                        />
                      </div>
                      <br/>
                      <div>
                        <Map
                          center={mapResults.center}
                          markers={mapResults.markers}
                          title={mapTitle}
                          zoomControlPosition={zoomControlPosition}
                        />
                      </div>
                    </Tab>
                    <Tab label='Bar'>
                      <SelectField
                        floatingLabelText='Select a Category'
                        hintText='Select a Category'
                        items={items}
                        style={style.verticalTop}
                        value={category}
                        onChange={this.onChangeCategory}
                      />
                      <BarChart
                        drilldown={chartDrilldown}
                        series={chartSeries}
                        title={chartTitle}
                      />
                    </Tab>
                  </Tabs>
                </div>
              )
            }
          })()}
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  category: state.category,
  filters: state.filters,
  label: state.label,
  latitude: state.latitude,
  longitude: state.longitude,
  mapResults: state.mapResults,
  searchResults: state.searchResults,
  source: state.source
}))(Search)