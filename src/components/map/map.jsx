import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import {City} from "../../const";
import {offersType, cityNameType, notRequiredOfferType} from "../../types";

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

    this._mapRef = React.createRef();

    this._markers = [];
  }

  getCurrentCityCoords() {
    const {activeCity} = this.props;
    const cityInfo = City[activeCity.toUpperCase()];

    return getCoords(cityInfo);
  }

  setMarkers() {
    if (this._map) {
      const {offers, activeOffer} = this.props;

      this._markers.forEach((marker) => {
        this._map.removeLayer(marker);
      });

      offers.map((offer) => {
        this._markers.push(
            leaflet.marker(getCoords(offer), {icon: iconMarker}).addTo(this._map)
        );
      });

      if (activeOffer) {
        this._markers.push(
            leaflet.marker(getCoords(activeOffer), {icon: iconMarkerActive}).addTo(this._map)
        );
      }
    }
  }

  updateMarker(offer, icon) {
    const coords = getCoords(offer);

    this._markers.filter((marker) => compareСoords(marker, coords))
      .forEach((marker) => {
        marker.setIcon(icon);
      });
  }

  updateMarkers(oldActiveOffer, newActiveOffer) {
    if (oldActiveOffer) {
      this.updateMarker(oldActiveOffer, iconMarker);
    }

    if (newActiveOffer) {
      this.updateMarker(newActiveOffer, iconMarkerActive);
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

    this._map = map;

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

  componentDidUpdate(prevProps) {
    const {activeCity, activeOffer, offers} = this.props;

    if (activeCity !== prevProps.activeCity) {
      this.setMarkers();
      this._map.flyTo(this.getCurrentCityCoords(), ZOOM, {duration: 0.5});
    } else if (offers !== prevProps.offers) {
      this.setMarkers();
    } else if (activeOffer !== prevProps.activeOffer) {
      this.updateMarkers(prevProps.activeOffer, activeOffer);
    }
  }

  componentWillUnmount() {
    this._map.remove();
    this._markers = null;
    this._map = null;
    this._mapRef.current.remove();
  }

  render() {
    return (
      <div ref={this._mapRef} id="map" style={{height: `100%`}}></div>
    );
  }
}

Map.propTypes = {
  offers: offersType,
  activeOffer: notRequiredOfferType,
  activeCity: cityNameType,
};

export default Map;
