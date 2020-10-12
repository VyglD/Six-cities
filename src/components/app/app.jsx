import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Main from "../main/main";
import Login from "../login/login";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";
import {
  offersType,
  pathsType,
  reviewsType,
  functionType,
  favoriteOffersType,
  citiesType,
  customOfferCardPropertiesEmumType
} from "../../types";
import Header from "../header/header";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
    };

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  getHeaderComponent(history) {
    return (
      <Header
        history={history}
        paths={this.props.paths}
        email={this.state.email}
      />
    );
  }

  handleSignIn(history, email) {
    this.setState({email});
    history.replace(this.props.paths.MAIN);
  }

  render() {
    const {
      offers,
      favoriteOffers,
      reviews,
      paths,
      cities,
      getSystemFormattedDate,
      getHumanFormattedDate,
      getRateVisualisation,
      getOffersByCities,
      customOfferCardPropertiesEmum
    } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact
            path={paths.MAIN}
            render={({history})=> {
              return (
                <Main
                  header={this.getHeaderComponent(history)}
                  offers={offers}
                  getRateVisualisation={getRateVisualisation}
                  getOffersByCities={getOffersByCities}
                  history={history}
                  paths={paths}
                  cities={cities}
                  customOfferCardProperties={customOfferCardPropertiesEmum.CITIES}
                />
              );
            }}
          />
          <Route exact
            path={paths.LOGIN}
            render={({history})=> {
              return (
                <Login
                  header={this.getHeaderComponent(history)}
                  onSignIn={this.handleSignIn.bind(this, history)}
                />
              );
            }}
          />
          <Route exact
            path={paths.FAVORITES}
            render={({history})=> {
              return (
                <Favorites
                  header={this.getHeaderComponent(history)}
                  offers={offers}
                  favoriteOffers={favoriteOffers}
                  getRateVisualisation={getRateVisualisation}
                  getOffersByCities={getOffersByCities}
                  customOfferCardProperties={customOfferCardPropertiesEmum.FAVORITES}
                />
              );
            }}
          />
          <Route exact
            path={paths.OFFER_ID}
            render={({history})=> {
              return (
                <Offer
                  header={this.getHeaderComponent(history)}
                  offers={this.props.offers}
                  reviews={reviews}
                  getRateVisualisation={getRateVisualisation}
                  history={history}
                  paths={paths}
                  getSystemFormattedDate={getSystemFormattedDate}
                  getHumanFormattedDate={getHumanFormattedDate}
                  email={this.state.email}
                />
              );
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: offersType,
  favoriteOffers: favoriteOffersType,
  paths: pathsType,
  cities: citiesType,
  reviews: reviewsType,
  getSystemFormattedDate: functionType,
  getHumanFormattedDate: functionType,
  getRateVisualisation: functionType,
  getOffersByCities: functionType,
  customOfferCardPropertiesEmum: customOfferCardPropertiesEmumType,
};

export default App;
