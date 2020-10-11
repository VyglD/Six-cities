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

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
    };

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn(history, email) {
    this.setState({email});
    history.replace(this.props.paths.MAIN);
  }

  render() {
    const {offers, rateCoefficient, placesCount, paths} = this.props;

    const getHeader = (history) => (
      <Header
        history={history}
        paths={paths}
        email={this.state.email}
      />
    );

    return (
      <BrowserRouter>
        <Switch>
          <Route exact
            path={paths.MAIN}
            render={({history})=> {
              return (
                <Main
                  header={getHeader(history)}
                  offers={offers}
                  rateCoefficient={rateCoefficient}
                  placesCount={placesCount}
                />
              );
            }}
          />
          <Route exact
            path={paths.LOGIN}
            render={({history})=> {
              return (
                <Login
                  header={getHeader(history)}
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
                  header={getHeader(history)}
                  offers={offers}
                  rateCoefficient={rateCoefficient}
                />
              );
            }}
          />
          <Route exact
            path={paths.OFFER}
            render={({history})=> {
              return (
                <Offer
                  header={getHeader(history)}
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
  rateCoefficient: rateCoefficientType,
  paths: pathsType,
};

export default App;
