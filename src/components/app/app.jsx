import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Main from "../main/main";
import Login from "../login/login";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";
import {
  offersType,
  reviewsType,
  pathsType,
  citiesType,
  numberConstantType,
  cardStyleEnumType,
  functionType,
  favoriteOfferIdsType,
} from "../../types";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      favoriteOfferIds: this.props.favoriteOfferIds,
      allReviews: this.props.allReviews,
    };

    this.allOffersByCities = props.getOffersByCities(props.allOffers);

    this.handleLogIn = this.handleLogIn.bind(this);
    this.handlefavoriteOfferIdsChange = this.handlefavoriteOfferIdsChange.bind(this);
    this.handleReviewAdd = this.handleReviewAdd.bind(this);
  }

  handleLogIn(email) {
    this.setState({email});
  }

  handlefavoriteOfferIdsChange(history, offer) {
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
      history.push(this.props.paths.LOGIN);
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
      paths,
      cities,
      maxNearOffers,
      maxReviews,
      cardStyleEnum,
      getSystemFormattedDate,
      getHumanFormattedDate,
      getRateVisualisation,
    } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact
            path={paths.MAIN}
            render={({history}) => (
              <Main
                favoriteOfferIds={this.state.favoriteOfferIds}
                paths={paths}
                cities={cities}
                cardStyle={cardStyleEnum.CITIES}
                getRateVisualisation={getRateVisualisation}
                allOffersByCities={this.allOffersByCities}
                email={this.state.email}
                onFavoritesChange = {this.handlefavoriteOfferIdsChange.bind(this, history)}
              />
            )}
          />
          <Route exact
            path={paths.LOGIN}
            render={()=> {
              return this.state.email
                ? (
                  <Redirect to={paths.MAIN} />
                )
                : (
                  <Login
                    paths={paths}
                    email={this.state.email}
                    onLogIn={this.handleLogIn}
                  />
                );
            }}
          />
          <Route exact
            path={paths.FAVORITES}
            render={({history}) => {
              return this.state.email
                ? (
                  <Favorites
                    favoriteOfferIds={this.state.favoriteOfferIds}
                    paths={paths}
                    cardStyle={cardStyleEnum.FAVORITES}
                    getRateVisualisation={getRateVisualisation}
                    allOffersByCities={this.allOffersByCities}
                    email={this.state.email}
                    onFavoritesChange = {this.handlefavoriteOfferIdsChange.bind(this, history)}
                  />
                )
                : (
                  <Redirect to={paths.LOGIN} />
                );
            }}
          />
          <Route exact
            path={`${paths.OFFER}/:${paths.OFFER_ID}`}
            render={({history, match}) => {
              const chosenOfferId = match.params[paths.OFFER_ID];
              const chosenOffer = allOffers.find((offer) => offer.id === chosenOfferId);

              return chosenOffer
                ? (
                  <Offer
                    chosenOffer={chosenOffer}
                    favoriteOfferIds={this.state.favoriteOfferIds}
                    allReviews={this.state.allReviews}
                    paths={paths}
                    maxNearOffers={maxNearOffers}
                    maxReviews={maxReviews}
                    cardStyle={cardStyleEnum.NEAR_PLACES}
                    getSystemFormattedDate={getSystemFormattedDate}
                    getHumanFormattedDate={getHumanFormattedDate}
                    getRateVisualisation={getRateVisualisation}
                    allOffersByCities={this.allOffersByCities}
                    email={this.state.email}
                    onFavoritesChange = {this.handlefavoriteOfferIdsChange.bind(this, history)}
                    onReviewAdd = {this.handleReviewAdd}
                  />
                )
                : (
                  <Redirect to={paths.MAIN} />
                );
            }}
          />
          <Redirect to={paths.MAIN} />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  allOffers: offersType,
  favoriteOfferIds: favoriteOfferIdsType,
  allReviews: reviewsType,
  paths: pathsType,
  cities: citiesType,
  maxNearOffers: numberConstantType,
  maxReviews: numberConstantType,
  cardStyleEnum: cardStyleEnumType,
  getSystemFormattedDate: functionType,
  getHumanFormattedDate: functionType,
  getRateVisualisation: functionType,
  getOffersByCities: functionType,
};

export default App;
