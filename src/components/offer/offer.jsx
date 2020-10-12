import React from "react";
import Review from "../review/review";
import ReviewForm from "../review-form/review-form";
import OfferCard from "../offer-card/offer-card";
import {
  componentType,
  historyType,
  offersType,
  reviewsType,
  pathsType,
  functionType,
  emailType,
  customOfferCardPropertiesType
} from "../../types";

class Offer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      offerValidity: this.isOfferIdValid(),
    };

    if (this.state.offerValidity) {
      this.state.offerId = this.getOfferId();
    }
  }

  getOfferId() {
    const {history} = this.props;

    const pathItems = history.location.pathname.split(`/`);
    return pathItems[pathItems.length - 1];
  }

  isOfferIdValid() {
    const {offers} = this.props;

    return offers.map((offer) => offer.id).includes(this.getOfferId());
  }

  render() {
    const {
      header,
      offers,
      reviews: allReviews,
      history,
      paths,
      getRateVisualisation,
      getSystemFormattedDate,
      getHumanFormattedDate,
      email,
      getOffersByCities,
      customOfferCardProperties
    } = this.props;

    if (this.state.offerValidity) {
      const offer = offers.find((element) => element.id === this.state.offerId);

      const reviews = allReviews.filter((review) => review.offerId === this.state.offerId);

      const nearOffers = getOffersByCities(offers)
        .get(offer.city)
        .filter((nearOffer) => nearOffer.id !== offer.id);

      return (
        <div className="page">
          {header}

          <main className="page__main page__main--property">
            <section className="property">
              <div className="property__gallery-container container">
                <div className="property__gallery">

                  {
                    offer.photos.map((photo, index) => {
                      return (
                        <div className="property__image-wrapper" key={index}>
                          <img
                            className="property__image"
                            src={photo}
                            width="260"
                            height="200"
                            alt="Photo studio"
                          />
                        </div>
                      );
                    })
                  }

                </div>
              </div>
              <div className="property__container container">
                <div className="property__wrapper">

                  {
                    offer.isPremium
                      ? (
                        <div className="property__mark">
                          <span>Premium</span>
                        </div>
                      )
                      : ``
                  }

                  <div className="property__name-wrapper">
                    <h1 className="property__name">
                      {offer.title}
                    </h1>
                    <button
                      className="property__bookmark-button button"
                      type="button"
                    >
                      <svg className="property__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span style={getRateVisualisation(offer.rate)}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">{offer.rate}</span>
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                      {offer.housingType}
                    </li>
                    <li className="property__feature property__feature--bedrooms">
                      {offer.rooms} Bedrooms
                    </li>
                    <li className="property__feature property__feature--adults">
                      Max {offer.guests} adults
                    </li>
                  </ul>
                  <div className="property__price">
                    <b className="property__price-value">&euro;{offer.cost}</b>
                    <span className="property__price-text">&nbsp;night</span>
                  </div>
                  <div className="property__inside">
                    <h2 className="property__inside-title">What&apos;s inside</h2>
                    <ul className="property__inside-list">
                      {
                        offer.features.map((feature) => (
                          <li className="property__inside-item" key={feature}>
                            {feature}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className="property__host">
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div className={
                        `property__avatar-wrapper ${
                          offer.owner.isSuper
                            ? `property__avatar-wrapper--pro`
                            : ``
                        } user__avatar-wrapper`
                      }>
                        <img
                          className="property__avatar user__avatar"
                          src={offer.owner.avatar}
                          width="74"
                          height="74"
                          alt="Host avatar"
                        />
                      </div>
                      <span className="property__user-name">
                        {offer.owner.name}
                      </span>
                    </div>
                    <div className="property__description">
                      {
                        offer.description.map((paragraph, index) => (
                          <p className="property__text" key={index}>{paragraph}</p>
                        ))
                      }
                    </div>
                  </div>
                  <section className="property__reviews reviews">
                    <h2 className="reviews__title">
                      Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
                    </h2>
                    <ul className="reviews__list">
                      {
                        reviews.map((review, index) => (
                          <Review
                            key={index}
                            review={review}
                            getRateVisualisation={getRateVisualisation}
                            getSystemFormattedDate={getSystemFormattedDate}
                            getHumanFormattedDate={getHumanFormattedDate}
                          />
                        ))
                      }
                    </ul>
                    {
                      email
                        ? <ReviewForm />
                        : ``
                    }
                  </section>
                </div>
              </div>
              <section className="property__map map"></section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <div className="near-places__list places__list">
                  {
                    nearOffers.map((nearOffer) => (
                      <OfferCard
                        offer={nearOffer}
                        getRateVisualisation={getRateVisualisation}
                        onMouseEnter={() => {}}
                        onClick={() => {}}
                        key={nearOffer.id}
                        customOfferCardProperties={customOfferCardProperties}
                      />
                    ))
                  }
                </div>
              </section>
            </div>
          </main>
        </div>
      );
    }

    history.replace(paths.MAIN);

    return null;
  }
}

Offer.propTypes = {
  header: componentType,
  offers: offersType,
  reviews: reviewsType,
  history: historyType,
  paths: pathsType,
  getRateVisualisation: functionType,
  getSystemFormattedDate: functionType,
  getHumanFormattedDate: functionType,
  email: emailType,
  customOfferCardProperties: customOfferCardPropertiesType,
  getOffersByCities: functionType,
};

export default Offer;
