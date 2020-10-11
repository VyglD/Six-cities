import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Main from "../main/main";
import Login from "../login/login";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";
import {
  offersType,
  rateCoefficientType,
  placesCountType,
  pathsType
} from "../../types";
import Header from "../header/header";

const App = (props) => {
  const {offers, rateCoefficient, placesCount, paths} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact
          path={paths.MAIN}
          render={({history})=> {
            return (
              <Main
                offers={offers}
                rateCoefficient={rateCoefficient}
                placesCount={placesCount}
                header={
                  <Header
                    history={history}
                    paths={paths}
                  />
                }
              />
            );
          }}
        />
        <Route exact
          path={paths.LOGIN}
          render={({history})=> {
            return (
              <Login
                header={
                  <Header
                    history={history}
                    paths={paths}
                  />
                }
              />
            );
          }}
        />
        <Route exact
          path={paths.FAVORITES}
          render={({history})=> {
            return (
              <Favorites
                offers={offers}
                rateCoefficient={rateCoefficient}
                header={
                  <Header
                    history={history}
                    paths={paths}
                  />
                }
              />
            );
          }}
        />
        <Route exact
          path={paths.OFFER}
          render={({history})=> {
            return (
              <Offer
                header={
                  <Header
                    history={history}
                    paths={paths}
                  />
                }
              />
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  placesCount: placesCountType,
  offers: offersType,
  rateCoefficient: rateCoefficientType,
  paths: pathsType,
};

export default App;
