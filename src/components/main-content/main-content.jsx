import React from "react";
import LocationsList from "../locations-list/locations-list";
import Places from "../places/places";
import {functionType, notRequiredCityNameType, offersType} from "../../types";
import {extend} from "../../util";
import {getOffersByCities, getFirstNotEmptyCity} from "../../offers";

import withActiveItem from "../../hocs/with-active-item/with-active-item";

class MainContent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.offersByCities = getOffersByCities(props.allOffers);

    this.handleChangeActiveCity = this.handleChangeActiveCity.bind(this);
  }

  handleChangeActiveCity(evt) {
    const {onItemChange} = this.props;
    const newCity = evt.target.textContent;

    evt.preventDefault();

    onItemChange(newCity);
  }

  render() {
    const customProps = extend(
        this.props,
        {
          activeCity: this.props.activeItem || getFirstNotEmptyCity(this.offersByCities),
          onChangeActiveCity: this.props.onItemChange,
        }
    );
    delete customProps.activeItem;
    delete customProps.onItemChange;

    const offers = this.offersByCities.get(customProps.activeCity);

    return (
      <main
        className={
          `page__main page__main--index ${
            offers.length === 0 && `page__main--index-empty`
          }`
        }
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsList
            {...customProps}
            onChangeActiveCity={this.handleChangeActiveCity}
          />
        </div>
        <Places
          {...customProps}
          offers={offers}
        />
      </main>
    );
  }
}

MainContent.propTypes = {
  allOffers: offersType,
  activeItem: notRequiredCityNameType,
  onItemChange: functionType,
};

export {MainContent};
export default withActiveItem(MainContent);
