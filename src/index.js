import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import offers from "./mocks/offers";
import reviews from "./mocks/reviews";
import favoriteOffers from "./mocks/favorite-offers";
import {
  getSystemFormattedDate,
  getHumanFormattedDate,
  getRateVisualisation,
  getOffersByCities
} from "./util";
import {PATHS, CITIES} from "./const";

ReactDOM.render(
    <App
      offers={offers}
      reviews={reviews}
      favoriteOffers={favoriteOffers}
      paths={PATHS}
      cities={CITIES}
      getSystemFormattedDate={getSystemFormattedDate}
      getHumanFormattedDate={getHumanFormattedDate}
      getRateVisualisation={getRateVisualisation}
      getOffersByCities={getOffersByCities}
    />,
    document.querySelector(`#root`)
);
