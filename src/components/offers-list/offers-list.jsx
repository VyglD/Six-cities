import React from "react";
import OfferCard from "../offer-card/offer-card";
import {historyType, offersType, pathsType, functionType} from "../../types";

class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOffer: null
    };

    this.handleOfferCardHover = this.handleOfferCardHover.bind(this);
    this.handleOfferCardClick = this.handleOfferCardClick.bind(this);
  }

  handleOfferCardHover(offer) {
    this.setState({activeOffer: offer});
  }

  handleOfferCardClick(evt) {
    const {history, paths} = this.props;

    evt.preventDefault();

    history.push(`${paths.OFFER}${this.state.activeOffer.id}`);
  }

  render() {
    const {offers, getRateVisualisation} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">

        {offers.map((offer) => (
          <OfferCard
            offer={offer}
            getRateVisualisation={getRateVisualisation}
            onMouseEnter={this.handleOfferCardHover}
            onClick={this.handleOfferCardClick}
            key={offer.id}
          />
        ))}

      </div>
    );
  }
}

OffersList.propTypes = {
  offers: offersType,
  getRateVisualisation: functionType,
  history: historyType,
  paths: pathsType,
};

export default OffersList;
