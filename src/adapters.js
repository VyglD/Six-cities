import {HousingType} from "./const";

const adaptOfferToClient = (serverOffer) => {
  const {
    id,
    city: {
      name: cityName,
      location: {
        latitude: cityLatitude,
        longitude: cityLongitude,
        zoom,
      }
    },
    location: {
      latitude,
      longitude
    },
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
    host: {
      [`avatar_url`]: avatar,
      name: hostName,
      [`is_pro`]: isSuper,
    },
  } = serverOffer;

  return {
    id: String(id),
    city: cityName,
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
    },
    cityInfo: {
      name: cityName,
      latitude: cityLatitude,
      longitude: cityLongitude,
      zoom,
    },
  };
};

const adaptReviewToClient = (serverReview) => {
  const {
    id,
    user: {
      [`avatar_url`]: photo,
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

const adaptReviewsToClient = (serverReviews) => {
  return serverReviews
    .map(adaptReviewToClient)
    .sort((i, j) => new Date(j.date) - new Date(i.date));
};

export {
  adaptOfferToClient,
  adaptReviewsToClient,
};
