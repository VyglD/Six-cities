import React from "react";
import OfferCard from "../offer-card/offer-card";
import {
  offersType,
  favoriteOfferIdsType,
  pathsType,
  cardStyleType,
  functionType,
  emailType,
} from "../../types";

class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOffer: (
        props.offers.length > 0
          ? props.offers[0]
          : null
      )
    };

    this.handleOfferCardHover = this.handleOfferCardHover.bind(this);
  }

  handleOfferCardHover(chosenOffer) {
    this.setState({activeOffer: chosenOffer});
  }

  render() {
    const {
      offers,
      favoriteOfferIds,
      paths,
      cardStyle,
      getRateVisualisation,
      email,
      onFavoritesChange,
    } = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">

        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            favoriteOfferIds={favoriteOfferIds}
            paths={paths}
            cardStyle={cardStyle}
            getRateVisualisation={getRateVisualisation}
            email={email}
            onMouseEnter={this.handleOfferCardHover}
            onFavoritesChange={onFavoritesChange}
          />
        ))}

      </div>
    );
  }
}

OffersList.propTypes = {
  offers: offersType,
  favoriteOfferIds: favoriteOfferIdsType,
  paths: pathsType,
  cardStyle: cardStyleType,
  getRateVisualisation: functionType,
  email: emailType,
  onFavoritesChange: functionType,
};

export default OffersList;
