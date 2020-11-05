import {extend} from "../util";
import {ActionCreator as OffersActionCreatorr} from "./offers/offers-actions";
import {ActionCreator as FavoriteActionCreator} from "./favorite/favorite-actions";
import {ActionCreator as OfferActionCreator} from "./offer/offer-actions";
import {ActionCreator as UserActionCreator} from "./user/user-actions";
import {ActionCreator as RedirectActionCreator} from "./redirect/redirect-actions";
import {ActionCreator as CityActionCreator} from "./city/city-actions";

export default extend(
    OffersActionCreatorr,
    FavoriteActionCreator,
    OfferActionCreator,
    UserActionCreator,
    RedirectActionCreator,
    CityActionCreator
);
