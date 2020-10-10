import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Main from "../main/main";
import Login from "../login/login";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";
import {offersType, rateCoefficientType, placesCountType} from "../../types";

const App = (props) => {
  const {offers, rateCoefficient, placesCount} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            offers={offers}
            rateCoefficient={rateCoefficient}
            placesCount={placesCount}
          />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
        <Route exact path="/offer/:id">
          <Offer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  placesCount: placesCountType,
  offers: offersType,
  rateCoefficient: rateCoefficientType,
};

export default App;
