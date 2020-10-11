import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import offers from "./mocks/offers";
import reviews from "./mocks/reviews";
import favoriteOffers from "./mocks/favorite-offers";
import {getSystemFormattedDate, getHumanFormattedDate} from "./util";
import {RATE_COEFFICIENT, PLACES_COUNT, PATHS} from "./const";

ReactDOM.render(
    <App
      offers={offers}
      reviews={reviews}
      favoriteOffers={favoriteOffers}
      rateCoefficient={RATE_COEFFICIENT}
      placesCount={PLACES_COUNT}
      paths={PATHS}
      getSystemFormattedDate={getSystemFormattedDate}
      getHumanFormattedDate={getHumanFormattedDate}
    />,
    document.querySelector(`#root`)
);
