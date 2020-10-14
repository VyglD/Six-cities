import React from "react";
import OfferCard from "../offer-card/offer-card";
import {
  offersType,
} from "../../types";
import {CardStyle} from "../../const";

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
    } = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">

        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            {...this.props}
            offer={offer}
            onMouseEnter={this.handleOfferCardHover}
            CardStyle={CardStyle.CITIES}
          />
        ))}

      </div>
    );
  }
}

OffersList.propTypes = {
  offers: offersType,
};

export default OffersList;
