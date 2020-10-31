import React from "react";
import Header from "../header/header";
import FavoriteButton from "../favorite-button/favorite-button";
import ReviewsList from "../reviews-list/reviews-list";
import ReviewForm from "../review-form/review-form";
import Map from "../map/map";
import OffersListNear from "../offers-list-near/offers-list-near";
import {
  offerType,
  favoriteOfferIdsType,
  reviewsType,
  emailType,
  offersType,
} from "../../types";
import {MAX_NEAR_OFFERS} from "../../const";
import {getRateVisualisation} from "../../util";

class Offer extends React.PureComponent {
  componentDidUpdate(nextProps) {
    if (nextProps.chosenOffer.id !== this.props.chosenOffer.id) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const {
      chosenOffer,
      favoriteOfferIds,
      allOffers,
      allReviews,
      email,
    } = this.props;

    const reviewsOfChosenOffer = allReviews.filter((review) => review.offerId === chosenOffer.id);

    const nearOffers = allOffers
      .filter((offer) => (offer.city === chosenOffer.city && offer.id !== chosenOffer.id))
      .slice(0, MAX_NEAR_OFFERS);

    return (
      <div className="page">
        <Header
          {...this.props}
        />

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">

                {
                  chosenOffer.photos.map((photo, index) => {
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
                  chosenOffer.isPremium
                    ? (
                      <div className="property__mark">
                        <span>Premium</span>
                      </div>
                    )
                    : ``
                }

                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {chosenOffer.title}
                  </h1>
                  <FavoriteButton
                    favoriteBtnStyle={{
                      btnClassName: `property__bookmark-button`,
                      btnActiveClassName: `property__bookmark-button--active`,
                      iconClassName: `property__bookmark-icon`,
                      iconWidth: 31,
                      iconHeight: 33,
                    }}
                    offer={chosenOffer}
                    favoriteOfferIds={favoriteOfferIds}
                    email={email}
                  />
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={getRateVisualisation(chosenOffer.rate)}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">
                    {chosenOffer.rate}
                  </span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {chosenOffer.housingType}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {chosenOffer.rooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {chosenOffer.guests} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{chosenOffer.cost}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {
                      chosenOffer.features.map((feature) => (
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
                        chosenOffer.owner.isSuper
                          ? `property__avatar-wrapper--pro`
                          : ``
                      } user__avatar-wrapper`
                    }>
                      <img
                        className="property__avatar user__avatar"
                        src={`/${chosenOffer.owner.avatar}`}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">
                      {chosenOffer.owner.name}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">{chosenOffer.description}</p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">
                    Reviews &middot; <span className="reviews__amount">{reviewsOfChosenOffer.length}</span>
                  </h2>
                  <ReviewsList
                    reviews={reviewsOfChosenOffer}
                  />
                  {
                    email && (
                      <ReviewForm
                        {...this.props}
                      />
                    )
                  }
                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map
                offers={nearOffers}
                activeOffer={chosenOffer}
                activeCity={chosenOffer.city}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <OffersListNear
                offers={nearOffers}
                {...this.props}
              />
            </section>
          </div>
        </main>
      </div>
    );
  }
}

Offer.propTypes = {
  chosenOffer: offerType,
  allOffers: offersType,
  favoriteOfferIds: favoriteOfferIdsType,
  allReviews: reviewsType,
  email: emailType,
};

export default Offer;
