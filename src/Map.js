import React, { Component } from 'react';
import { DatePicker, Button, LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import moment from 'moment';

const { RangePicker } = DatePicker;

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
		isAdded: true
    };
  }

  componentDidMount() {
	var _this = this;
	let L = this.props.Leaflet;
	var map = L.map(this._mapNode).setView([44, 50], 2);

	L.tileLayer('http://{s}.tile.osm.kosmosnimki.ru/kosmo/{z}/{x}/{y}.png', {
		maxZoom: 18
	}).addTo(map);
	L.gmx.loadMap('AZR6A', {leafletMap: map}).then(function(gmxMap) {
		var control = L.control.gmxTimeline({
			moveable: true
		})
			.on('dateInterval', function (ev) {
				gmxMap.layersByID[ev.layerID].setDateInterval(ev.beginDate, ev.endDate);
				_this.setState({range: [moment.utc(ev.beginDate), moment.utc(ev.endDate)]});
			})
			.on('click', function (ev) {
				gmxMap.layersByID[ev.layerID].repaint();
			});

		map.addControl(control);
		var cDate = new Date(Date.UTC(2017, 0, 1)),
			beginDate = new Date(cDate.valueOf() - 1000 * 60 * 60 * 24),
			endDate = cDate,
			layerID = 'C13B4D9706F7491EBC6DC70DFFA988C0',
			hotSpotsGlobal = gmxMap.layersByID[layerID];

		hotSpotsGlobal.setDateInterval(beginDate, endDate);
		var defaultValue = [moment.utc(beginDate), moment.utc(endDate)];
		_this.setState({range: defaultValue, defaultRange: defaultValue});

		control.addLayer(hotSpotsGlobal);
		map.addLayer(hotSpotsGlobal);

		_this.showLayer = () => {
			if (map.hasLayer(hotSpotsGlobal)) {
				map.removeLayer(hotSpotsGlobal);
			} else {
				map.addLayer(hotSpotsGlobal);
			}
		}
		_this.showTimeline = () => {
			if (_this.state.isAdded) {
				control.removeLayer(hotSpotsGlobal);
			} else {
				control.addLayer(hotSpotsGlobal);
			}
			_this.setState({isAdded: !_this.state.isAdded});
		}
		_this.setDateInterval = (value) => {
			if (!value[0]) {
				value = _this.state.defaultRange;
			}
			hotSpotsGlobal.setDateInterval(value[0]._d, value[1]._d);
			_this.setState({range: value});
		}
	});

  }
	toogleLayer = () => {
		this.showLayer();
	}
	toogleTimeline = () => {
		this.showTimeline();
	}
	handleChange = (value, dateString) => {
		this.setDateInterval(value);
	}

	handleDone = (value) => {
		this.setDateInterval(value);
	}

  render() {
    return (
      <div className="Map">
		<div ref={(node) => this._mapNode = node} id="map" />
        <div className="Nav">
			<div>
				<LocaleProvider locale={enUS}>
					<RangePicker
					  showTime
					  format="DD.MM.YYYY HH:mm:ss"
					  placeholder={['Start Time', 'End Time']}
					  value={this.state.range}
					  defaultValue={this.state.defaultRange}
					  onChange={this.handleChange}
					  onOk={this.handleDone}
					/>
				</LocaleProvider>
			</div>
			<Button type="danger" loading={this.state.loading} onClick={this.toogleTimeline}>On/Off Timeline</Button>
			<Button type="dashed" onClick={this.toogleLayer}>On/Off Layer</Button>
		</div>
      </div>
    );
  }
}

export default Map;
