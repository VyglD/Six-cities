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
  pathsType,
  reviewsType,
  functionType,
  favoriteOffersType
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
      rateCoefficient,
      placesCount,
      paths,
      getSystemFormattedDate,
      getHumanFormattedDate
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
                  rateCoefficient={rateCoefficient}
                  placesCount={placesCount}
                  history={history}
                  paths={paths}
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
                  rateCoefficient={rateCoefficient}
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
                  rateCoefficient={rateCoefficient}
                  history={history}
                  paths={paths}
                  getSystemFormattedDate={getSystemFormattedDate}
                  getHumanFormattedDate={getHumanFormattedDate}
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
  placesCount: placesCountType,
  offers: offersType,
  favoriteOffers: favoriteOffersType,
  rateCoefficient: rateCoefficientType,
  paths: pathsType,
  reviews: reviewsType,
  getSystemFormattedDate: functionType,
  getHumanFormattedDate: functionType,
};

export default App;
