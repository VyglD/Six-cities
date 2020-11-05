import React from "react";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import RestrictiveRoute from "../restrictive-route/restrictive-route";
import Main from "../main/main";
import Login from "../login/login";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";
import browserHistory from "../../browser-history";
import ActionCreator from "../../store/root-actions";
import {getAllOfferIds} from "../../store/selectors";
import {fetchReviews, fetchNearOffers} from "../../middlewares/thunk-api";
import {Path} from "../../const";
import {
  boolType,
  functionType,
  offerIdsType,
} from "../../types";

const App = (props) => {
  const {isLogin, allOffersIds, openOffer} = props;

  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact
          path={Path.MAIN}
          render={() => (<Main />)}
        />
        <RestrictiveRoute
          condition={!isLogin}
          exact={true}
          path={Path.LOGIN}
          redirectPath={Path.MAIN}
          render={() => (<Login />)}
        />
        <RestrictiveRoute
          condition={isLogin}
          exact={true}
          path={Path.FAVORITES}
          redirectPath={Path.LOGIN}
          render={() => (<Favorites />)}
        />
        <Route exact
          path={`${Path.OFFER}/:${Path.OFFER_ID}`}
          render={({match}) => {
            const chosenOfferId = match.params[Path.OFFER_ID];

            if (allOffersIds.includes(chosenOfferId)) {
              openOffer(chosenOfferId);
              return (
                <Offer
                  offerId={chosenOfferId}
                />
              );
            }

            return (
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
  openOffer: functionType,
};

const mapStateToProps = (state) => ({
  isLogin: state.USER.isLogin,
  allOffers: state.OFFERS.allOffers,
  allOffersIds: getAllOfferIds(state),
});

const mapDispatchToProps = (dispatch) => ({
  openOffer: (offerId) => {
    dispatch(ActionCreator.openOffer(offerId));
    dispatch(fetchReviews());
    dispatch(fetchNearOffers());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
