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
  favoriteOffersType,
} from "../../types";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
    };

    this.allOffersByCities = props.getOffersByCities(props.allOffers);

    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn(email) {
    this.setState({email});
  }

  render() {
    const {
      allOffers,
      favoriteOffers,
      allReviews,
      paths,
      cities,
      maxNearOffers,
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
            render={() => (
              <Main
                allOffers={allOffers}
                paths={paths}
                cities={cities}
                cardStyle={cardStyleEnum.CITIES}
                getRateVisualisation={getRateVisualisation}
                allOffersByCities={this.allOffersByCities}
                email={this.state.email}
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
            render={() => {
              return this.state.email
                ? (
                  <Favorites
                    favoriteOffers={favoriteOffers}
                    paths={paths}
                    cardStyle={cardStyleEnum.FAVORITES}
                    getRateVisualisation={getRateVisualisation}
                    allOffersByCities={this.allOffersByCities}
                    email={this.state.email}
                  />
                )
                : (
                  <Redirect to={paths.LOGIN} />
                );
            }}
          />
          <Route exact
            path={`${paths.OFFER}/:${paths.OFFER_ID}`}
            render={({match}) => {
              const chosenOfferId = match.params[paths.OFFER_ID];
              const chosenOffer = allOffers.find((offer) => offer.id === chosenOfferId);

              return chosenOffer
                ? (
                  <Offer
                    chosenOffer={chosenOffer}
                    allReviews={allReviews}
                    paths={paths}
                    maxNearOffers={maxNearOffers}
                    cardStyle={cardStyleEnum.NEAR_PLACES}
                    getSystemFormattedDate={getSystemFormattedDate}
                    getHumanFormattedDate={getHumanFormattedDate}
                    getRateVisualisation={getRateVisualisation}
                    allOffersByCities={this.allOffersByCities}
                    email={this.state.email}
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
  favoriteOffers: favoriteOffersType,
  allReviews: reviewsType,
  paths: pathsType,
  cities: citiesType,
  maxNearOffers: numberConstantType,
  cardStyleEnum: cardStyleEnumType,
  getSystemFormattedDate: functionType,
  getHumanFormattedDate: functionType,
  getRateVisualisation: functionType,
  getOffersByCities: functionType,
};

export default App;
