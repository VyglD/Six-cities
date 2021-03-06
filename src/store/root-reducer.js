import {combineReducers} from "redux";
import offersReducer from "./offers/offers-reducer";
import favoriteReducer from "./favorite/favorite-reducer";
import offerReducer from "./offer/offer-reducer";
import userReducer from "./user/user-reducer";
import redirectReducer from "./redirect/redirect-reducer";
import cityReducer from "./city/city-reducer";

const NameSpace = {
  OFFERS: `OFFERS`,
  FAVORITES: `FAVORITES`,
  OFFER: `OFFER`,
  USER: `USER`,
  REDIRECT: `REDIRECT`,
  CITY: `CITY`,
};

export default combineReducers({
  [NameSpace.OFFERS]: offersReducer,
  [NameSpace.FAVORITES]: favoriteReducer,
  [NameSpace.OFFER]: offerReducer,
  [NameSpace.USER]: userReducer,
  [NameSpace.REDIRECT]: redirectReducer,
  [NameSpace.CITY]: cityReducer,
});
