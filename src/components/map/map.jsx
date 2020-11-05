import React from "react";
import {connect} from "react-redux";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import {getCitiesInfo} from "../../store/selectors";
import {offersType, cityNameType, notRequiredOfferType, mapType} from "../../types";

const PIN_SIZE = 30;
const ANIMATION_DURATION = 0.5;

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

const IconPattern = leaflet.Icon.extend({
  options: {
    iconUrl: `/img/pin.svg`,
    iconSize: [PIN_SIZE, PIN_SIZE]
  }
});

const iconMarker = new IconPattern();
const iconMarkerActive = new IconPattern({iconUrl: `/img/pin-active.svg`});

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();

    this._markers = [];
  }

  componentDidMount() {
    const currentCityCoords = this._getCurrentCityCoords();
    const zoom = this._getCityZoom();

    const map = leaflet.map(`map`, {
      center: currentCityCoords,
      zoom,
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

    this._setMarkers();

    map.setView(currentCityCoords, zoom);
  }

  componentDidUpdate(prevProps) {
    const {activeCity, activeOffer, offers} = this.props;

    if (activeCity !== prevProps.activeCity) {
      this._setMarkers();
      this._map.flyTo(
          this._getCurrentCityCoords(),
          this._getCityZoom(),
          {duration: ANIMATION_DURATION});
    } else if (offers !== prevProps.offers) {
      this._setMarkers();
    } else if (activeOffer !== prevProps.activeOffer) {
      this._updateMarkers(prevProps.activeOffer, activeOffer);
    }
  }

  componentWillUnmount() {
    this._map.remove();
    this._markers = null;
    this._map = null;
    this._mapRef.current.remove();
  }

  _getCurrentCityCoords() {
    const {activeCity, citiesInfo} = this.props;
    const cityInfo = citiesInfo.get(activeCity);

    return getCoords(cityInfo);
  }

  _getCityZoom() {
    const {citiesInfo, activeCity} = this.props;

    return citiesInfo.get(activeCity).zoom;
  }

  _setMarkers() {
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

  _updateMarker(offer, icon) {
    const coords = getCoords(offer);

    this._markers.filter((marker) => compareСoords(marker, coords))
      .forEach((marker) => {
        marker.setIcon(icon);
      });
  }

  _updateMarkers(oldActiveOffer, newActiveOffer) {
    if (oldActiveOffer) {
      this._updateMarker(oldActiveOffer, iconMarker);
    }

    if (newActiveOffer) {
      this._updateMarker(newActiveOffer, iconMarkerActive);
    }
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
  citiesInfo: mapType,
};

const mapStateToProps = (state) => ({
  citiesInfo: getCitiesInfo(state),
});

export {Map};
export default connect(mapStateToProps)(Map);
