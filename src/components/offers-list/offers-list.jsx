import React from "react";
import OfferCard from "../offer-card/offer-card";
import {offersType, rateCoefficientType} from "../../types";

class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOffer: null
    };

    this.handleOfferCardHover = this.handleOfferCardHover.bind(this);
  }

  handleOfferCardHover(offer) {
    this.setState({activeOffer: offer});
  }

  render() {
    const {offers, rateCoefficient} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">

        {offers.map((offer) => (
          <OfferCard
            offer={offer}
            rateCoefficient={rateCoefficient}
            onMouseEnter={this.handleOfferCardHover}
            key={offer.id}
          />
        ))}

      </div>
    );
  }
}

OffersList.propTypes = {
  offers: offersType,
  rateCoefficient: rateCoefficientType
};

export default OffersList;
