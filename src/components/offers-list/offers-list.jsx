import React from "react";
import OfferCard from "../offer-card/offer-card";
import {
  offersType,
  pathsType,
  cardStyleType,
  functionType,
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
      paths,
      cardStyle,
      getRateVisualisation,
    } = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">

        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            paths={paths}
            cardStyle={cardStyle}
            getRateVisualisation={getRateVisualisation}
            onMouseEnter={this.handleOfferCardHover}
          />
        ))}

      </div>
    );
  }
}

OffersList.propTypes = {
  offers: offersType,
  paths: pathsType,
  cardStyle: cardStyleType,
  getRateVisualisation: functionType,
};

export default OffersList;
