import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main";
import Login from "../login/login";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";
import {changeFavorite} from "../../store/actions";
import {
  offersType,
  favoriteOfferIdsType,
  functionType,
} from "../../types";
import {Path} from "../../const";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
    };

    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleFavoriteOfferIdsChange = this.handleFavoriteOfferIdsChange.bind(this);
    this.handleReviewAdd = this.handleReviewAdd.bind(this);
  }

  handleLogIn(email) {
    this.setState({email});
  }

  handleFavoriteOfferIdsChange(history, offer) {
    const {changeFavorites} = this.props;

    if (this.state.email) {
      changeFavorites(offer);
    } else {
      history.push(Path.LOGIN);
    }
  }

  handleReviewAdd(review, callback) {
    this.setState((state) => {
      const allReviewsOld = state.allReviews.slice();

      allReviewsOld.push(review);

      return (
        {allReviews: allReviewsOld}
      );
    }, callback);
  }

  render() {
    const {allOffers, favoriteOfferIds} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact
            path={Path.MAIN}
            render={({history}) => (
              <Main
                allOffers={allOffers}
                favoriteOfferIds={favoriteOfferIds}
                email={this.state.email}
                onFavoritesChange = {this.handleFavoriteOfferIdsChange.bind(this, history)}
              />
            )}
          />
          <Route exact
            path={Path.LOGIN}
            render={()=> {
              return this.state.email
                ? (
                  <Redirect to={Path.MAIN} />
                )
                : (
                  <Login
                    email={this.state.email}
                    onLogIn={this.handleLogIn}
                  />
                );
            }}
          />
          <Route exact
            path={Path.FAVORITES}
            render={({history}) => {
              return this.state.email
                ? (
                  <Favorites
                    favoriteOfferIds={favoriteOfferIds}
                    allOffers={allOffers}
                    email={this.state.email}
                    onFavoritesChange = {this.handleFavoriteOfferIdsChange.bind(this, history)}
                  />
                )
                : (
                  <Redirect to={Path.LOGIN} />
                );
            }}
          />
          <Route exact
            path={`${Path.OFFER}/:${Path.OFFER_ID}`}
            render={({history, match}) => {
              const chosenOfferId = match.params[Path.OFFER_ID];
              const chosenOffer = allOffers.find((offer) => offer.id === chosenOfferId);

              return chosenOffer
                ? (
                  <Offer
                    chosenOffer={chosenOffer}
                    allOffers={allOffers}
                    favoriteOfferIds={favoriteOfferIds}
                    allReviews={[]}
                    email={this.state.email}
                    onFavoritesChange = {this.handleFavoriteOfferIdsChange.bind(this, history)}
                    onReviewAdd = {this.handleReviewAdd}
                  />
                )
                : (
                  <Redirect to={Path.MAIN} />
                );
            }}
          />
          <Redirect to={Path.MAIN} />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  allOffers: offersType,
  favoriteOfferIds: favoriteOfferIdsType,
  changeFavorites: functionType,
};

const mapStateToProps = (state) => ({
  allOffers: state.allOffers,
  favoriteOfferIds: state.favoriteOfferIds,
});

const mapDispatchToProps = (dispatch) => ({
  changeFavorites(offer) {
    dispatch(changeFavorite(offer));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
