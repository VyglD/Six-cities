import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import mockOffers from "./mocks/offers";
import mockReviews from "./mocks/reviews";
import favoriteOffers from "./mocks/favorite-offers";
import {
  getSystemFormattedDate,
  getHumanFormattedDate,
  getRateVisualisation,
  getOffersByCities,
} from "./util";
import {
  Paths,
  CITIES,
  CardStyle as cardStyleEnum,
  MAX_NEAR_OFFERS,
} from "./const";

ReactDOM.render(
    <App
      allOffers={mockOffers}
      favoriteOffers={favoriteOffers}
      allReviews={mockReviews}
      paths={Paths}
      cities={CITIES}
      maxNearOffers={MAX_NEAR_OFFERS}
      cardStyleEnum={cardStyleEnum}
      getSystemFormattedDate={getSystemFormattedDate}
      getHumanFormattedDate={getHumanFormattedDate}
      getRateVisualisation={getRateVisualisation}
      getOffersByCities={getOffersByCities}
    />,
    document.querySelector(`#root`)
);
