import React from "react";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main";
import Login from "../login/login";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";
import browserHistory from "../../browser-history";
import {
  boolType,
  offersType,
} from "../../types";
import {Path} from "../../const";

const App = (props) => {
  const {isLogin, allOffers} = props;

  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact
          path={Path.MAIN}
          render={() => (
            <Main />
          )}
        />
        <Route exact
          path={Path.LOGIN}
          render={()=> {
            return isLogin
              ? (
                <Redirect to={Path.MAIN} />
              )
              : (
                <Login />
              );
          }}
        />
        <Route exact
          path={Path.FAVORITES}
          render={() => {
            return isLogin
              ? (
                <Favorites />
              )
              : (
                <Redirect to={Path.LOGIN} />
              );
          }}
        />
        <Route exact
          path={`${Path.OFFER}/:${Path.OFFER_ID}`}
          render={({match}) => {
            const chosenOfferId = match.params[Path.OFFER_ID];
            const chosenOffer = allOffers.find((offer) => offer.id === chosenOfferId);

            return chosenOffer
              ? (
                <Offer
                  chosenOffer={chosenOffer}
                />
              )
              : (
                <Redirect to={Path.MAIN} />
              );
          }}
        />
        <Redirect to={Path.MAIN} />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  isLogin: boolType,
  allOffers: offersType,
};

const mapStateToProps = ({OFFERS, USER}) => ({
  isLogin: USER.isLogin,
  allOffers: OFFERS.allOffers,
});


export {App};
export default connect(mapStateToProps)(App);
