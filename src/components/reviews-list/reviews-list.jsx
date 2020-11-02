import React from "react";
import {MAX_REVIEWS} from "../../const";
import {reviewsType} from "../../types";
import Review from "../review/review";

const ReviewsList = (props) => {
  const {reviews} = props;

  return (
    <ul className="reviews__list">
      {
        reviews.slice(0, MAX_REVIEWS)
          .map((review) => (
            <Review
              key={review.id}
              review={review}
            />
          ))
      }
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: reviewsType,
};

export default ReviewsList;
