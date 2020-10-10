import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import offers from "./mocks/offers";
import {RATE_COEFFICIENT, PLACES_COUNT} from "./const";

ReactDOM.render(
    <App
      offers={offers}
      rateCoefficient={RATE_COEFFICIENT}
      placesCount={PLACES_COUNT}
    />,
    document.querySelector(`#root`)
);
