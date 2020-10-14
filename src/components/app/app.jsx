import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Main from "../main/main";
import Login from "../login/login";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";
import {
  offersType,
  reviewsType,
  favoriteOfferIdsType,
} from "../../types";
import {CITIES, Path} from "../../const";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      favoriteOfferIds: this.props.favoriteOfferIds,
      allReviews: this.props.allReviews,
    };

    this.allOffersByCities = this.getOffersByCities(props.allOffers);

    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleFavoriteOfferIdsChange = this.handleFavoriteOfferIdsChange.bind(this);
    this.handleReviewAdd = this.handleReviewAdd.bind(this);
  }

  getOffersByCities(offers) {
    const offersByCity = new Map([
      ...CITIES.map((city) => [city, []])
    ]);

    offers.forEach((offer) => {
      offersByCity.get(offer.city).push(offer);
    });

    return offersByCity;
  }

  handleLogIn(email) {
    this.setState({email});
  }

  handleFavoriteOfferIdsChange(history, offer) {
    if (this.state.email) {
      const oldfavoriteOfferIds = this.state.favoriteOfferIds.slice();
      const index = oldfavoriteOfferIds.findIndex((offerId) => offerId === offer.id);

      if (index === -1) {
        oldfavoriteOfferIds.push(offer.id);

        this.setState({favoriteOfferIds: oldfavoriteOfferIds});
      } else {
        oldfavoriteOfferIds.splice(index, 1);

        this.setState({favoriteOfferIds: oldfavoriteOfferIds});
      }
    } else {
      history.push(Path.LOGIN);
    }
  }

  handleReviewAdd(review, callback) {
    const allReviewsOld = this.state.allReviews.slice();

    allReviewsOld.push(review);

    this.setState(
        {allReviews: allReviewsOld},
        callback
    );
  }

  render() {
    const {
      allOffers,
    } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact
            path={Path.MAIN}
            render={({history}) => (
              <Main
                favoriteOfferIds={this.state.favoriteOfferIds}
                allOffersByCities={this.allOffersByCities}
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
                    favoriteOfferIds={this.state.favoriteOfferIds}
                    allOffersByCities={this.allOffersByCities}
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
                    favoriteOfferIds={this.state.favoriteOfferIds}
                    allReviews={this.state.allReviews}
                    allOffersByCities={this.allOffersByCities}
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
  allReviews: reviewsType,
};

export default App;
