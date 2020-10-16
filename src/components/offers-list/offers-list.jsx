import React from "react";
import OfferCardMain from "../offer-card-main/offer-card-main";
import {
  offersType,
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
    } = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">

        {offers.map((offer) => (
          <OfferCardMain
            key={offer.id}
            {...this.props}
            offer={offer}
            onMouseEnter={this.handleOfferCardHover}
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
