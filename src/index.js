import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import offers from "./mocks/offers";
import reviews from "./mocks/reviews";
import favoriteOffers from "./mocks/favorite-offers";
import {
  getSystemFormattedDate,
  getHumanFormattedDate,
  getRateVisualisation
} from "./util";
import {PLACES_COUNT, PATHS} from "./const";

ReactDOM.render(
    <App
      offers={offers}
      reviews={reviews}
      favoriteOffers={favoriteOffers}
      placesCount={PLACES_COUNT}
      paths={PATHS}
      getSystemFormattedDate={getSystemFormattedDate}
      getHumanFormattedDate={getHumanFormattedDate}
      getRateVisualisation={getRateVisualisation}
    />,
    document.querySelector(`#root`)
);
