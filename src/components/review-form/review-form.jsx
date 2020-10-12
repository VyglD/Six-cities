import React from "react";

const MIN_CHARACTERS = 50;
const MAX_CHARACTERS = 300;

class ReviewForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      review: ``,
      isValid: false,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
  }

  checkFormValidity() {
    const {review, rating} = this.state;

    if (review.length > MIN_CHARACTERS
      && review.length < MAX_CHARACTERS
      && rating > 0) {
      this.setState({isValid: true});
    } else {
      this.setState({isValid: false});
    }
  }

  handleRatingChange(evt) {
    this.setState(
        {rating: parseInt(evt.target.value, 10)},
        this.checkFormValidity
    );
  }

  handleFieldChange(evt) {
    const {name, value} = evt.target;
    this.setState(
        {[name]: value},
        this.checkFormValidity
    );
  }

  handleSubmitComment(evt) {
    evt.preventDefault();

    // вызов метода для изменения массива комментов
  }

  render() {
    return (
      <form
        className="reviews__form form"
        action="#"
        method="post"
        onSubmit={this.handleSubmitComment}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value="5"
            id="stars-5"
            type="radio"
            onChange={this.handleRatingChange}
          />
          <label htmlFor="stars-5" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value="4"
            id="stars-4"
            type="radio"
            onChange={this.handleRatingChange}
          />
          <label htmlFor="stars-4" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value="3"
            id="stars-3"
            type="radio"
            onChange={this.handleRatingChange}
          />
          <label htmlFor="stars-3" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value="2"
            id="stars-2"
            type="radio"
            onChange={this.handleRatingChange}
          />
          <label htmlFor="stars-2" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value="1"
            id="stars-1"
            type="radio"
            onChange={this.handleRatingChange}
          />
          <label htmlFor="stars-1" className="reviews__rating-label form__rating-label" title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          onChange={this.handleFieldChange}
          placeholder="Tell how was your stay, what you like and what can be improved">
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={this.state.isValid ? `` : `disabled`}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default ReviewForm;
