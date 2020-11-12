const Key = {
  ENTER: `Enter`,
  ESC: `Escape`,
  SPACE: ` `,
  TAB: `Tab`,
  SHIFT: `Shift`,
  UP: `ArrowUp`,
  DOWN: `ArrowDown`,
};

const CITIES = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`
];

const city = CITIES[3];
const activeCity = CITIES[0];

const HousingType = {
  APARTMENT: `Apartment`,
  ROOM: `Private Room`,
  HOUSE: `House`,
  HOTEL: `Hotel`
};

const SortType = {
  DEFAULT: {
    value: `Popular`,
    method: () => {},
  },
  PRICE_TO_HIGH: {
    value: `Price: low to high`,
    method: (i, j) => (i.cost - j.cost),
  },
  PRICE_TO_LOW: {
    value: `Price: high to low`,
    method: (i, j) => (j.cost - i.cost),
  },
  RATE: {
    value: `Top rated first`,
    method: (i, j) => (j.rate - i.rate),
  },
};

const mockOffers = [
  {
    id: `1`,
    city: CITIES[0],
    latitude: 48.95,
    longitude: 2.35,
    title: `Title of first server offer`,
    photos: [`img/photo1`, `img/photo11`],
    description: `Description of first server offer`,
    isPremium: true,
    housingType: HousingType.APARTMENT,
    rate: 4.5,
    rooms: 4,
    guests: 4,
    cost: 111,
    features: [`Washer`, `Towels`, `Fridge`],
    owner: {
      avatar: `img/avatar-angelina.jpg`,
      name: `Anna`,
      isSuper: true,
    },
    cityInfo: {
      name: CITIES[0],
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 12,
    }
  },
  {
    id: `2`,
    city: CITIES[0],
    latitude: 48.87,
    longitude: 2.33,
    title: `Title of cheapest offer`,
    photos: [],
    description: `Description of cheapest offer`,
    isPremium: false,
    housingType: HousingType.HOTEL,
    rate: 3,
    rooms: 3,
    guests: 3,
    cost: 1,
    features: [],
    owner: {
      avatar: `img/avatar-angelina.jpg`,
      name: `Angelina`,
      isSuper: true,
    },
    cityInfo: {
      name: CITIES[0],
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 12,
    }
  },
  {
    id: `3`,
    city: CITIES[1],
    latitude: 50.95,
    longitude: 6.95,
    title: `Title of most expensive offer`,
    photos: [`img/photo3`],
    description: `Description of most expensive offer`,
    isPremium: true,
    housingType: HousingType.APARTMENT,
    rate: 4.5,
    rooms: 4,
    guests: 4,
    cost: 4444,
    features: [`Washer`, `Towels`, `Fridge`],
    owner: {
      avatar: `img/avatar-angelina.jpg`,
      name: `Anna`,
      isSuper: true,
    },
    cityInfo: {
      name: CITIES[1],
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  {
    id: `4`,
    city: CITIES[2],
    latitude: 50.83,
    longitude: 4.34,
    title: `Title of top rated offer`,
    photos: [`img/photo4`, `img/photo44`],
    description: `Description of top rated offer`,
    isPremium: true,
    housingType: HousingType.HOUSE,
    rate: 5,
    rooms: 1,
    guests: 1,
    cost: 222,
    features: [`Washer`, `Towels`, `Fridge`],
    owner: {
      avatar: `img/avatar-angelina.jpg`,
      name: `Anna`,
      isSuper: true,
    },
    cityInfo: {
      name: CITIES[1],
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },
];

const mockOffersFavoriteIds = [`1`, `2`];

const mockReview = {
  id: `1`,
  name: `Bob`,
  photo: `img/photo`,
  rate: 3,
  date: new Date(0),
  text: `comment`,
};

const mockFunction = () => {};

const mockEvent = {
  preventDefault: mockFunction,
};

const mockEscKeyEvent = Object.assign(
    {},
    mockEvent,
    {
      key: Key.ESC,
    }
);

export {
  Key,
  city,
  activeCity,
  CITIES,
  SortType,
  mockOffers,
  mockOffersFavoriteIds,
  mockReview,
  mockFunction,
  mockEvent,
  mockEscKeyEvent,
};
