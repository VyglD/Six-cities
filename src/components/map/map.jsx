import leaflet from "leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import React from "react";
import {City} from "../../const";
import {offersType, cityNameType} from "../../types";

const ZOOM = 12;

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();

    this.markers = [];
  }

  getCurrentCityCoords() {
    const {activeCity} = this.props;
    const cityInfo = City[activeCity.toUpperCase()];
    const currentCity = [cityInfo.latitude, cityInfo.longitude];

    return currentCity;
  }

  setMarkers() {
    if (this.map) {
      const {offers} = this.props;

      const icon = leaflet.icon({
        iconUrl: `/img/pin.svg`,
        iconSize: [30, 30]
      });

      this.markers.forEach((marker) => {
        this.map.removeLayer(marker);
      });

      offers.map((offer) => {
        this.markers.push(
            leaflet.marker([offer.latitude, offer.longitude], {icon}).addTo(this.map)
        );
      });
    }
  }

  componentDidMount() {
    const currentCity = this.getCurrentCityCoords();

    const map = leaflet.map(`map`, {
      center: currentCity,
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    });

    this.map = map;

    leaflet
    .tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {
          attribution: (
            `&copy;
            <a href="https://www.openstreetmap.org/copyright">
              OpenStreetMap
            </a> contributors &copy;
            <a href="https://carto.com/attributions">CARTO</a>`
          )
        }
    )
    .addTo(map);

    this.setMarkers();

    map.setView(currentCity, ZOOM);
  }

  componentDidUpdate() {
    this.setMarkers();
    this.map.setView(this.getCurrentCityCoords(), ZOOM);
  }

  componentWillUnmount() {
    this.map.remove();
    this.map = null;
    this.mapRef.current.remove();
  }

  render() {
    return (
      <div ref={this.mapRef} id="map" style={{height: `100%`}}></div>
    );
  }
}

Map.propTypes = {
  offers: offersType,
  activeCity: cityNameType,
};

export default Map;


