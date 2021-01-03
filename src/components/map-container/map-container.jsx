import React from "react";
import {connect} from "react-redux";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import {getCitiesInfo} from "../../store/selectors";
import {offersType, cityNameType, notRequiredOfferType, mapType} from "../../types";

const PIN_SIZE = 30;
const ANIMATION_DURATION = 0.5;

const compareСoords = (coords1, coords2) => {
  return coords1.lat === coords2.lat && coords1.lng === coords2.lng;
};

const getCoords = (coordStore) => {
  return {
    lat: coordStore.latitude,
    lng: coordStore.longitude,
  };
};

const IconPattern = leaflet.Icon.extend({
  options: {
    iconUrl: `img/pin.svg`,
    iconSize: [PIN_SIZE, PIN_SIZE]
  }
});

const iconMarker = new IconPattern();
const iconMarkerActive = new IconPattern({iconUrl: `img/pin-active.svg`});

const MapContainer = (props) => {
  const {activeCity, citiesInfo, offers, activeOffer} = props;

  const currentCityCoords = React.useMemo(
      () => {
        return getCoords(citiesInfo.get(activeCity));
      },
      [activeCity, citiesInfo]
  );

  const zoom = React.useMemo(
      () => {
        return citiesInfo.get(activeCity).zoom;
      },
      [activeCity, citiesInfo]
  );

  const leafletMap = React.useRef();
  const markersLayer = React.useRef(leaflet.layerGroup([]));
  const activeMarkerLayer = React.useRef(leaflet.layerGroup([]));

  React.useEffect(
      () => {
        leafletMap.current = leaflet.map(
            `map`,
            {
              center: currentCityCoords,
              zoom,
              zoomControl: true,
              marker: true,
              scrollWheelZoom: false,
              layers: [markersLayer.current, activeMarkerLayer.current],
            }
        );

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
          .addTo(leafletMap.current);

        leafletMap.current.setView(currentCityCoords, zoom);

        return () => {
          leafletMap.current.remove();
          leafletMap.current = null;
        };
      },
      // Имитация componentDidMount
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
  );

  React.useEffect(
      () => {
        if (leafletMap.current) {
          if (!compareСoords(leafletMap.current.getCenter(), currentCityCoords)) {
            leafletMap.current.flyTo(
                currentCityCoords,
                zoom,
                {duration: ANIMATION_DURATION}
            );
          }

          offers.map((offer) => {
            markersLayer.current.addLayer(
                leaflet.marker(getCoords(offer), {icon: iconMarker})
            );
          });
        }

        return () => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          markersLayer.current.clearLayers();
        };
      },
      [offers, currentCityCoords, zoom]
  );

  React.useEffect(
      () => {
        activeMarkerLayer.current.clearLayers();
        if (activeOffer) {
          activeMarkerLayer.current.addLayer(
              leaflet.marker(getCoords(activeOffer), {icon: iconMarkerActive})
          );
        }
        return () => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          activeMarkerLayer.current.clearLayers();
        };
      },
      [activeOffer]
  );

  return (
    <div id="map" style={{height: `100%`}}></div>
  );
};

MapContainer.propTypes = {
  offers: offersType,
  activeOffer: notRequiredOfferType,
  activeCity: cityNameType,
  citiesInfo: mapType,
};

const mapStateToProps = (state) => ({
  citiesInfo: getCitiesInfo(state),
});

export {MapContainer};
export default connect(mapStateToProps)(MapContainer);
