import React from "react";
import Header from "../header/header";
import Review from "../review/review";
import ReviewForm from "../review-form/review-form";
import OfferCardNear from "../offer-card-near/offer-card-near";
import {
  offerType,
  favoriteOfferIdsType,
  reviewsType,
  functionType,
  mapType,
  emailType,
} from "../../types";
import {MAX_NEAR_OFFERS, MAX_REVIEWS} from "../../const";
import {getRateVisualisation} from "../../util";

const Offer = (props) => {
  const {
    chosenOffer,
    favoriteOfferIds,
    allReviews,
    allOffersByCities,
    email,
    onFavoritesChange
  } = props;

  const reviewsOfChosenOffer = allReviews.filter((review) => review.offerId === chosenOffer.id);

  const nearOffers = allOffersByCities.get(chosenOffer.city)
    .filter((offer) => offer.id !== chosenOffer.id)
    .slice(0, MAX_NEAR_OFFERS);

  const favoriteClass = (
    `property__bookmark-button button ${
      email && favoriteOfferIds.includes(chosenOffer.id)
        ? `property__bookmark-button--active`
        : ``
    }`
  );

  return (
    <div className="page">
      <Header
        {...props}
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
                <button
                  className={favoriteClass}
                  type="button"
                  onClick={() => onFavoritesChange(chosenOffer)}
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
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
                      src={chosenOffer.owner.avatar}
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
                  {
                    chosenOffer.description.map((paragraph, index) => (
                      <p className="property__text" key={index}>{paragraph}</p>
                    ))
                  }
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">{reviewsOfChosenOffer.length}</span>
                </h2>
                <ul className="reviews__list">
                  {
                    reviewsOfChosenOffer.slice(0, MAX_REVIEWS)
                      .map((review, index) => (
                        <Review
                          key={index}
                          review={review}
                        />
                      ))
                  }
                </ul>
                {
                  email
                    ? (
                      <ReviewForm
                        {...props}
                      />
                    )
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
                  <OfferCardNear
                    key={nearOffer.id}
                    {...props}
                    offer={nearOffer}
                  />
                ))
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

Offer.propTypes = {
  chosenOffer: offerType,
  favoriteOfferIds: favoriteOfferIdsType,
  allReviews: reviewsType,
  allOffersByCities: mapType,
  email: emailType,
  onFavoritesChange: functionType,
};

export default Offer;
