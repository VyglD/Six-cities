import React from "react";
import OfferCardMain from "../offer-card-main/offer-card-main";
import {
  offersType,
} from "../../types";

class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);
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
