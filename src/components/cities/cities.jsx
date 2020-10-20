import React from "react";
import {connect} from "react-redux";
import OffersListMain from "../offers-list-main/offers-list-main";
import Map from "../map/map";
import {
  offersType,
  offerType,
  cityNameType,
  functionType,
} from "../../types";
import {ActionCreater} from "../../store/action";

class Cities extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleOfferCardHover = this.handleOfferCardHover.bind(this);
  }

  handleOfferCardHover(chosenOffer) {
    this.props.changeActiveOffer(chosenOffer);
  }

  render() {
    const {
      offers,
      activeOffer,
      activeCity,
    } = this.props;

    return (
      <div className="cities">
        {
          offers.length > 0
            ? (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} places to stay in {activeCity}</b>
                  <form className="places__sorting" action="#" method="get">
                    <span className="places__sorting-caption">Sort by</span>
                    <span className="places__sorting-type" tabIndex="0">
                      Popular
                      <svg className="places__sorting-arrow" width="7" height="4">
                        <use xlinkHref="#icon-arrow-select"></use>
                      </svg>
                    </span>
                    <ul className="places__options places__options--custom">
                      <li className="places__option places__option--active" tabIndex="0">Popular</li>
                      <li className="places__option" tabIndex="0">Price: low to high</li>
                      <li className="places__option" tabIndex="0">Price: high to low</li>
                      <li className="places__option" tabIndex="0">Top rated first</li>
                    </ul>
                  </form>
                  <OffersListMain
                    onMouseEnter={this.handleOfferCardHover}
                    {...this.props}
                  />
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map
                      {...this.props}
                      activeOffer={activeOffer}
                    />
                  </section>
                </div>
              </div>
            )
            : (
              <div className="cities__places-container cities__places-container--empty container">
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">
                      We could not find any property available at the moment in Dusseldorf
                    </p>
                  </div>
                </section>
                <div className="cities__right-section"></div>
              </div>
            )

        }
      </div>
    );
  }
}

Cities.propTypes = {
  offers: offersType,
  activeOffer: offerType,
  activeCity: cityNameType,
  changeActiveOffer: functionType,
};

const mapStateToProps = (state) => ({
  activeOffer: state.activeOffer,
});

const mapDispatchToProps = (dispatch) => ({
  changeActiveOffer(newOffer) {
    dispatch(ActionCreater.changeActiveOffer(newOffer));
  }
});

export {Cities};
export default connect(mapStateToProps, mapDispatchToProps)(Cities);
