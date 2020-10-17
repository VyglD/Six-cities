import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app";
import {reducer} from "./store/reducer";
import mockOffers from "./mocks/offers";
import mockReviews from "./mocks/reviews";
import mockFavoriteOfferIds from "./mocks/favorite-offers";

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App
        allOffers={mockOffers}
        favoriteOfferIds={mockFavoriteOfferIds}
        allReviews={mockReviews}
      />
    </Provider>,
    document.querySelector(`#root`)
);
