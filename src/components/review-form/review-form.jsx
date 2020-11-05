import React from "react";
import {connect} from "react-redux";
import {addNewReview} from "../../middlewares/thunk-api";
import {functionType, offerType} from "../../types";

const MIN_CHARACTERS = 50;
const MAX_CHARACTERS = 300;

const RATE_INPUT_CLASS = `form__rating-input`;
const SERVER_ERRROR = `Ошибка на сервере`;

class ReviewForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this._ratingRef = React.createRef();
    this._reviewRef = React.createRef();
    this._submitRef = React.createRef();

    this._handleNewReviewSubmit = this._handleNewReviewSubmit.bind(this);
    this._hundleSubmitButtonClick = this._hundleSubmitButtonClick.bind(this);
    this._handleFieldChange = this._handleFieldChange.bind(this);

    this._clearForm = this._clearForm.bind(this);
    this._showServerError = this._showServerError.bind(this);
  }

  componentDidMount() {
    // Кнопка деактивируется после установки, а не при помощи передачи props disabled,
    // так как при передаче props disabled перестаёт вызываться метод onClick кнопки
    // даже после её активации
    this._disableSubmitButton();
  }

  _showServerError() {
    this._reviewRef.current.setCustomValidity(SERVER_ERRROR);
    this._reviewRef.current.reportValidity();
  }

  _clearForm() {
    this._ratingRef.current.querySelector(`.${RATE_INPUT_CLASS}:checked`).checked = false;
    this._reviewRef.current.value = ``;

    this._reviewRef.current.setCustomValidity(``);

    this._disableSubmitButton();
  }

  _isReviewFieldValidity() {
    const reviewTextLength = this._reviewRef.current.value.length;

    return (reviewTextLength >= MIN_CHARACTERS) && (reviewTextLength < MAX_CHARACTERS);
  }

  _isRatingFieldValidity() {
    const ratingInputs = this._ratingRef.current.querySelectorAll(`.${RATE_INPUT_CLASS}`);

    return Boolean(Array.from(ratingInputs).filter((input) => input.checked).length);
  }

  _isFormValidity() {
    return this._isReviewFieldValidity() && this._isRatingFieldValidity();
  }

  _disableSubmitButton() {
    this._submitRef.current.disabled = !(this._isFormValidity());
  }

  _handleFieldChange() {
    this._disableSubmitButton();
  }

  _hundleSubmitButtonClick() {
    this._reviewRef.current.setCustomValidity(``);
  }

  _handleNewReviewSubmit(evt) {
    if (this._isFormValidity()) {
      const {postNewReview, chosenOffer} = this.props;

      evt.preventDefault();

      postNewReview(
          {
            offerId: chosenOffer.id,
            comment: this._reviewRef.current.value,
            rating: parseInt(this._ratingRef.current.querySelector(`.${RATE_INPUT_CLASS}:checked`).value, 10),
          },
          this._clearForm,
          this._showServerError
      );
    }
  }

  render() {
    return (
      <form
        className="reviews__form form"
        action="#"
        method="post"
        onSubmit={this._handleNewReviewSubmit}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div
          className="reviews__rating-form form__rating"
          ref={this._ratingRef}
        >
          <input
            className={`${RATE_INPUT_CLASS} visually-hidden`}
            name="rating"
            value="5"
            id="stars-5"
            type="radio"
            onChange={this._handleFieldChange}
          />
          <label htmlFor="stars-5" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input
            className={`${RATE_INPUT_CLASS} visually-hidden`}
            name="rating"
            value="4"
            id="stars-4"
            type="radio"
            onChange={this._handleFieldChange}
          />
          <label htmlFor="stars-4" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input
            className={`${RATE_INPUT_CLASS} visually-hidden`}
            name="rating"
            value="3"
            id="stars-3"
            type="radio"
            onChange={this._handleFieldChange}
          />
          <label htmlFor="stars-3" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input
            className={`${RATE_INPUT_CLASS} visually-hidden`}
            name="rating"
            value="2"
            id="stars-2"
            type="radio"
            onChange={this._handleFieldChange}
          />
          <label htmlFor="stars-2" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input
            className={`${RATE_INPUT_CLASS} visually-hidden`}
            name="rating"
            value="1"
            id="stars-1"
            type="radio"
            onChange={this._handleFieldChange}
          />
          <label htmlFor="stars-1" className="reviews__rating-label form__rating-label" title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          ref={this._reviewRef}
          id="review"
          name="review"
          onChange={this._handleFieldChange}
          placeholder="Tell how was your stay, what you like and what can be improved">
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            ref={this._submitRef}
            onClick={this._hundleSubmitButtonClick}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

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
