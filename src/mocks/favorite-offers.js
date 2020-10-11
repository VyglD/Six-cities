import offers, {getRandomSubArray} from "./offers";

const MAX_FAVORITE_OFFERS = 3;

export default getRandomSubArray(offers)
  .slice(0, MAX_FAVORITE_OFFERS)
  .map((offer) => offer.id);
