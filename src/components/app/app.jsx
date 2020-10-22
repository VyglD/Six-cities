import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main";
import Login from "../login/login";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";
import {
  offersType,
  reviewsType,
  favoriteOfferIdsType,
} from "../../types";
import {Path} from "../../const";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      favoriteOfferIds: this.props.favoriteOfferIds,
      allReviews: this.props.allReviews,
    };

    this.currentOfferId = ``;

    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleFavoriteOfferIdsChange = this.handleFavoriteOfferIdsChange.bind(this);
    this.handleReviewAdd = this.handleReviewAdd.bind(this);
  }

  handleLogIn(email) {
    this.setState({email});
  }

  handleFavoriteOfferIdsChange(history, offer) {
    if (this.state.email) {
      this.setState((state) => {
        const oldfavoriteOfferIds = state.favoriteOfferIds.slice();
        const index = oldfavoriteOfferIds.findIndex((offerId) => offerId === offer.id);

        if (index === -1) {
          return {favoriteOfferIds: [...oldfavoriteOfferIds, offer.id]};
        }

        oldfavoriteOfferIds.splice(index, 1);

        return {favoriteOfferIds: oldfavoriteOfferIds};
      });
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
    const {allOffers} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact
            path={Path.MAIN}
            render={({history}) => (
              <Main
                allOffers={allOffers}
                favoriteOfferIds={this.state.favoriteOfferIds}
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

              if (this.currentOfferId !== chosenOfferId) {
                this.currentOfferId = chosenOfferId;
                window.scrollTo(0, 0);
              }

              return chosenOffer
                ? (
                  <Offer
                    chosenOffer={chosenOffer}
                    allOffers={allOffers}
                    favoriteOfferIds={this.state.favoriteOfferIds}
                    allReviews={this.state.allReviews}
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

const mapStateToProps = (state) => ({
  allOffers: state.allOffers,
});

export {App};
export default connect(mapStateToProps)(App);
