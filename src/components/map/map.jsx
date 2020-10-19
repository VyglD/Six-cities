import leaflet from "leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import React from "react";
import {City} from "../../const";
import {offersType, cityNameType, offerType} from "../../types";

const ZOOM = 12;
const PIN_SIZE = 30;

const IconPattern = leaflet.Icon.extend({
  options: {
    iconUrl: `/img/pin.svg`,
    iconSize: [PIN_SIZE, PIN_SIZE]
  }
});

const iconMarker = new IconPattern();
const iconMarkerActive = new IconPattern({iconUrl: `/img/pin-active.svg`});

const compareСoords = (marker, coords) => {
  const markerCoord = marker.getLatLng();
  return markerCoord.lat === coords.lat && markerCoord.lng === coords.lng;
};

const getCoords = (coordStore) => {
  return {
    lat: coordStore.latitude,
    lng: coordStore.longitude,
  };
};

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();

    this.markers = [];
  }

  getCurrentCityCoords() {
    const {activeCity} = this.props;
    const cityInfo = City[activeCity.toUpperCase()];

    return getCoords(cityInfo);
  }

  setMarkers() {
    if (this.map) {
      const {offers} = this.props;

      this.markers.forEach((marker) => {
        this.map.removeLayer(marker);
      });

      offers.map((offer) => {
        this.markers.push(
            leaflet.marker(getCoords(offer), {icon: iconMarker}).addTo(this.map)
        );
      });

      if (this.activeOffer) {
        this.markers.push(
            leaflet.marker(getCoords(this.activeOffer), {icon: iconMarkerActive}).addTo(this.map)
        );
      }
    }
  }

  updateMarkers(oldActiveOffer, newActiveOffer) {
    if (oldActiveOffer) {
      const oldCoords = getCoords(oldActiveOffer);

      this.markers.filter((marker) => compareСoords(marker, oldCoords))
        .forEach((marker) => {
          marker.setIcon(iconMarker);
        });
    }

    const newCoords = getCoords(newActiveOffer);

    this.markers.filter((marker) => compareСoords(marker, newCoords))
      .forEach((marker) => {
        marker.setIcon(iconMarkerActive);
      });
  }

  componentDidMount() {
    const {activeCity, activeOffer} = this.props;
    this.activeCity = activeCity;
    this.activeOffer = activeOffer;

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
    const {activeCity, activeOffer} = this.props;

    if (activeCity !== this.activeCity) {
      this.activeCity = activeCity;
      this.activeOffer = activeOffer;

      this.setMarkers();
      this.map.setView(this.getCurrentCityCoords(), ZOOM);
    } else if (activeOffer !== this.activeOffer) {
      this.updateMarkers(this.activeOffer, activeOffer);

      this.activeOffer = activeOffer;
    }
  }

  componentWillUnmount() {
    this.map.remove();
    this.activeCity = null;
    this.activeOffer = null;
    this.markers = null;
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
  activeOffer: offerType,
  activeCity: cityNameType,
};

export default Map;


