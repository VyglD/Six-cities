import React from "react";
import {connect} from "react-redux";
import Header from "../header/header";
import FavoriteButton from "../favorite-button/favorite-button";
import Stars from "../stars/stars";
import ReviewsList from "../reviews-list/reviews-list";
import ReviewForm from "../review-form/review-form";
import MapContainer from "../map-container/map-container";
import OffersList from "../offers-list/offers-list";
import {
  MAX_NEAR_OFFERS,
  MAX_OFFER_PHOTO,
  MAX_REVIEWS,
  OffersListProps
} from "../../const";
import {
  offersType,
  boolType,
  offerIdType,
  reviewsType,
} from "../../types";

const STARS_CLASS = `property__stars`;

const FAVORITE_BTN_STYLE = {
  btnClassName: `property__bookmark-button`,
  btnActiveClassName: `property__bookmark-button--active`,
  iconClassName: `property__bookmark-icon`,
  iconWidth: 31,
  iconHeight: 33,
};

const Offer = (props) => {
  const {
    offerId,
    allOffers,
    isLogin,
    reviews,
    nearOffers,
  } = props;

  const previousOfferId = React.useRef(offerId);

  React.useEffect(
      () => {
        if (previousOfferId.current !== offerId) {
          window.scrollTo(0, 0);
          previousOfferId.current = offerId;
        }
      },
      [offerId]
  );

  const chosenOffer = allOffers.find((offer) => offer.id === offerId);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                chosenOffer.photos
                  .slice(0, MAX_OFFER_PHOTO)
                  .map((photo, index) => {
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
                chosenOffer.isPremium &&
                  (
                    <div className="property__mark">
                      <span>Premium</span>
                    </div>
                  )
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {chosenOffer.title}
                </h1>
                <FavoriteButton
                  favoriteBtnStyle={FAVORITE_BTN_STYLE}
                  offer={chosenOffer}
                />
              </div>
              <div className="property__rating rating">
                <Stars
                  customClass={STARS_CLASS}
                  offer={chosenOffer}
                />
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
                  Reviews &middot; <span className="reviews__amount">
                    {Math.min(reviews.length, MAX_REVIEWS)}
                  </span>
                </h2>
                <ReviewsList
                  reviews={reviews.slice(0, MAX_REVIEWS)}
                />
                {
                  isLogin && (
                    <ReviewForm
                      chosenOffer={chosenOffer}
                    />
                  )
                }
              </section>
            </div>
          </div>
          <section className="property__map map">
            <MapContainer
              offers={nearOffers}
              activeOffer={chosenOffer}
              activeCity={chosenOffer.city}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              offers={nearOffers.slice(0, MAX_NEAR_OFFERS)}
              className={OffersListProps.NEAR.containerClass}
              cardStyle={OffersListProps.NEAR.cardStyle}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

Offer.propTypes = {
  offerId: offerIdType,
  allOffers: offersType,
  isLogin: boolType,
  reviews: reviewsType,
  nearOffers: offersType,
};

const mapStateToProps = ({USER, OFFERS, OFFER}) => ({
  isLogin: USER.isLogin,
  allOffers: OFFERS.allOffers,
  reviews: OFFER.reviews,
  nearOffers: OFFER.nearOffers,
});

export {Offer};
export default connect(mapStateToProps)(Offer);
