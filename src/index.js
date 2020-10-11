import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import offers from "./mocks/offers";
import {RATE_COEFFICIENT, PLACES_COUNT, PATHS} from "./const";

ReactDOM.render(
    <App
      offers={offers}
      rateCoefficient={RATE_COEFFICIENT}
      placesCount={PLACES_COUNT}
      paths={PATHS}
    />,
    document.querySelector(`#root`)
);
