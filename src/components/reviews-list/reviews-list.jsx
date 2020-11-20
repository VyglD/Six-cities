import React from "react";
import ReviewsItem from "../reviews-item/reviews-item";
import {reviewsType} from "../../types";

const ReviewsList = (props) => {
  const {reviews} = props;

  return (
    <ul className="reviews__list">
      {
        reviews
          .map((review) => (
            <ReviewsItem
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
