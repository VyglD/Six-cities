import React from "react";
import {connect} from "react-redux";
import {addNewReview} from "../../middlewares/thunk-api";
import {MAX_RATE} from "../../const";
import {functionType, offerType} from "../../types";

const MIN_CHARACTERS = 50;
const MAX_CHARACTERS = 300;

const RATE_INPUT_CLASS = `form__rating-input`;
const SERVER_ERROR = `Ошибка на сервере`;

const ReviewForm = (props) => {
  const {postNewReview, chosenOffer} = props;

  const ratingRef = React.useRef();
  const reviewRef = React.useRef();
  const submitRef = React.useRef();

  const toggleSubmitButton = React.useCallback(
      (enabled) => {
        submitRef.current.disabled = !enabled;
      },
      []
  );

  React.useEffect(
      () => {
        // Кнопка деактивируется после установки, а не при помощи передачи props disabled,
        // так как при передаче props disabled перестаёт вызываться метод onClick кнопки
        // даже после её активации
        toggleSubmitButton(false);
      },
      [toggleSubmitButton]
  );

  const showServerError = React.useCallback(
      () => {
        reviewRef.current.setCustomValidity(SERVER_ERROR);
        reviewRef.current.reportValidity();

        toggleSubmitButton(true);
      },
      [toggleSubmitButton]
  );

  const clearForm = React.useCallback(
      () => {
        ratingRef.current.querySelector(`.${RATE_INPUT_CLASS}:checked`).checked = false;
        reviewRef.current.value = ``;

        reviewRef.current.setCustomValidity(``);

        toggleSubmitButton(false);
      },
      [toggleSubmitButton]
  );

  const isReviewFieldValidity = React.useCallback(
      () => {
        const reviewTextLength = reviewRef.current.value.length;

        return (reviewTextLength >= MIN_CHARACTERS) && (reviewTextLength < MAX_CHARACTERS);
      },
      []
  );

  const isRatingFieldValidity = React.useCallback(
      () => {
        const ratingInputs = ratingRef.current.querySelectorAll(`.${RATE_INPUT_CLASS}`);

        return Boolean(Array.from(ratingInputs).filter((input) => input.checked).length);
      },
      []
  );

  const isFormValidity = React.useCallback(
      () => {
        return isReviewFieldValidity() && isRatingFieldValidity();
      },
      [isReviewFieldValidity, isRatingFieldValidity]
  );

  const handleFieldChange = React.useCallback(
      () => {
        toggleSubmitButton(isFormValidity());
      },
      [toggleSubmitButton, isFormValidity]
  );

  const handleNewReviewSubmit = React.useCallback(
      (evt) => {
        if (isFormValidity()) {
          evt.preventDefault();

          toggleSubmitButton(false);

          postNewReview(
              {
                offerId: chosenOffer.id,
                comment: reviewRef.current.value,
                rating: parseInt(ratingRef.current.querySelector(`.${RATE_INPUT_CLASS}:checked`).value, 10),
              },
              clearForm,
              showServerError
          );
        }
      },
      [
        postNewReview,
        isFormValidity,
        toggleSubmitButton,
        chosenOffer.id,
        clearForm,
        showServerError
      ]
  );

  const hundleSubmitButtonClick = React.useCallback(
      (evt) => {
        evt.preventDefault();

        reviewRef.current.setCustomValidity(``);

        handleNewReviewSubmit(evt);
      },
      [handleNewReviewSubmit]
  );

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleNewReviewSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div
        className="reviews__rating-form form__rating"
        ref={ratingRef}
      >
        {
          new Array(MAX_RATE)
            .fill()
            .map((_, index) => {
              const number = MAX_RATE - index;
              const id = `stars-${number}`;

              return (
                <React.Fragment
                  key={id}
                >
                  <input
                    className={`${RATE_INPUT_CLASS} visually-hidden`}
                    name="rating"
                    value={number}
                    id={id}
                    type="radio"
                    onChange={handleFieldChange}
                  />
                  <label htmlFor={id} className="reviews__rating-label form__rating-label" title="perfect">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>
                </React.Fragment>
              );
            })
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        ref={reviewRef}
        id="review"
        name="review"
        onChange={handleFieldChange}
        placeholder="Tell how was your stay, what you like and what can be improved">
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          ref={submitRef}
          onClick={hundleSubmitButtonClick}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  chosenOffer: offerType,
  postNewReview: functionType,
};

const mapDispatchToProps = (dispatch) => ({
  postNewReview(data, onSuccess, onFail) {
    dispatch(addNewReview(data))
      .then(() => onSuccess())
      .catch(() => onFail());
  },
});

export {ReviewForm};
export default connect(null, mapDispatchToProps)(ReviewForm);
