import React from "react";
import {
  getSystemFormattedDate,
  getHumanFormattedDate,
  getRateVisualisation,
} from "../../util";
import {reviewType} from "../../types";

const Review = (props) => {
  const {
    review,
  } = props;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          {
            review.photo
              ? (
                <img
                  className="reviews__avatar user__avatar"
                  src={review.photo}
                  width="54"
                  height="54"
                  alt="Reviews avatar"
                />
              )
              : ``
          }
        </div>
        <span className="reviews__user-name">
          {review.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={getRateVisualisation(review.rate)}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.text}
        </p>
        <time
          className="reviews__time"
          dateTime={getSystemFormattedDate(review.date)}
        >
          {getHumanFormattedDate(review.date)}
        </time>
      </div>
    </li>
  );
};

Review.propTypes = {
  review: reviewType,
};

export default Review;
