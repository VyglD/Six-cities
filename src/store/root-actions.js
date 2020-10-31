import {ActionCreator as OffersActionCreatorr} from "./offers/offers-actions";
import {ActionCreator as FavoriteActionCreator} from "./favorite/favorite-actions";
import {ActionCreator as ReviewsActionCreator} from "./reviews/reviews-actions";
import {extend} from "../util";

export default extend(
    OffersActionCreatorr,
    FavoriteActionCreator,
    ReviewsActionCreator
);
