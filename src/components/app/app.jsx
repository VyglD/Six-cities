import React from "react";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main";
import Login from "../login/login";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";
import browserHistory from "../../browser-history";
import {getAllOfferIds} from "../../store/selectors";
import {
  boolType,
  offerIdsType,
} from "../../types";
import {Path} from "../../const";

const App = (props) => {
  const {isLogin, allOffersIds} = props;

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

            return allOffersIds.includes(chosenOfferId)
              ? (
                <Offer
                  offerId={chosenOfferId}
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
  allOffersIds: offerIdsType,
};

const mapStateToProps = (state) => ({
  isLogin: state.USER.isLogin,
  allOffers: state.OFFERS.allOffers,
  allOffersIds: getAllOfferIds(state),
});

export {App};
export default connect(mapStateToProps)(App);
