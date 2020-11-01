import {HousingType} from "./const";

export const adaptOfferToClient = (serverOffer) => {
  const {
    id,
    city,
    location,
    title,
    images,
    description,
    [`is_premium`]: isPremium,
    type,
    rating,
    bedrooms,
    [`max_adults`]: guests,
    price,
    goods,
    host,
  } = serverOffer;
  const {name} = city;
  const {latitude, longitude} = location;
  const {
    [`avatar_url`]: avatar,
    name: hostName,
    [`is_pro`]: isSuper,
  } = host;

  return {
    id: String(id),
    city: name,
    latitude,
    longitude,
    title,
    photos: images,
    description,
    isPremium,
    housingType: HousingType[type.toUpperCase()],
    rate: rating,
    rooms: bedrooms,
    guests,
    cost: price,
    features: goods,
    owner: {
      avatar,
      name: hostName,
      isSuper,
    }
  };
};

export const adaptReviewToClient = (serverReview) => {
  const {
    id,
    user: {
      "avatar_url": photo,
      name
    },
    rating,
    date,
    comment,
  } = serverReview;

  return {
    id: String(id),
    name,
    photo,
    rate: rating,
    date: new Date(date),
    text: comment,
  };
};
