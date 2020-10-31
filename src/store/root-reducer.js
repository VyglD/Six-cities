import {combineReducers} from "redux";
import offersReducer from "./offers/offers-reducer";
import favoriteReducer from "./favorite/favorite-reducer";
import reviewsReducer from "./reviews/reviews-reducer";

const NameSpace = {
  OFFERS: `OFFERS`,
  FAVORITES: `FAVORITES`,
  REVIEWS: `REVIEWS`,
};

export default combineReducers({
  [NameSpace.OFFERS]: offersReducer,
  [NameSpace.FAVORITES]: favoriteReducer,
  [NameSpace.REVIEWS]: reviewsReducer,
});
