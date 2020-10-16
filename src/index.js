import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import mockOffers from "./mocks/offers";
import mockReviews from "./mocks/reviews";
import mockFavoriteOfferIds from "./mocks/favorite-offers";

ReactDOM.render(
    <App
      allOffers={mockOffers}
      favoriteOfferIds={mockFavoriteOfferIds}
      allReviews={mockReviews}
    />,
    document.querySelector(`#root`)
);
