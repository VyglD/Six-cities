import {HOUSING_TYPE} from "../const";

const AVATAR_URL = `https://api.adorable.io/avatars/74`;
const BIG_NUMBER = 999;

const MAX_PHOTOS = 5;
const MAX_RATE = 5;
const MAX_ROOMS = 3;
const MAX_GUESTS = 4;

const features = [
  `Wi-Fi`,
  `Heating`,
  `Kitchen`,
  `Fridge`,
  `Washing machine`,
  `Coffee machine`,
  `Dishwasher`,
  `Towels`,
  `Baby seat`,
  `Cabel TV`
];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generatePhotos = () => {
  return new Array(getRandomInteger(MAX_PHOTOS))
    .fill()
    .map(() => {
      return `https://picsum.photos/id/${getRandomInteger(BIG_NUMBER)}/260/200`;
    });
};

const getRandomElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const shuffleArray = (arr) => {
  return arr.slice().sort(() => {
    return 0.5 - Math.random();
  });
};

const getRandomSubArray = (array) => {
  const length = array.length;
  const half = Math.floor(length / 2);
  const start = getRandomInteger(0, half);
  const end = getRandomInteger(half, length);

  return shuffleArray(array).slice(start, end);
};

export default [
  {
    id: `1`,
    city: `Amsterdam`,
    title: `Beautiful & luxurious apartment at great location`,
    photos: [`/img/apartment-01.jpg`, ...generatePhotos()],
    description: [
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`
    ],
    isPremium: true,
    housingType: HOUSING_TYPE.APARTMENT,
    rate: getRandomInteger(MAX_RATE),
    rooms: getRandomInteger(MAX_ROOMS),
    guests: getRandomInteger(MAX_GUESTS),
    cost: 120,
    features: getRandomSubArray(features),
    owner: {
      avatar: `/img/avatar-angelina.jpg`,
      name: `Angelina`,
      isSuper: true
    }
  },
  {
    id: `2`,
    city: `Amsterdam`,
    title: `Wood and stone place`,
    photos: [`/img/room.jpg`, ...generatePhotos()],
    description: [
      `This average-sized, rectangular bedroom has matching wooden furniture.
        The floor is stone and the walls are painted and decorated with a wallpaper border.
        Light is provided by table lamps and a ceiling light.
        The room is done in colors that remind you of Easter and overall has a quirky look.
        Among the first things one notices walking in is a collection of action figures.`
    ],
    isPremium: false,
    housingType: HOUSING_TYPE.ROOM,
    rate: getRandomInteger(MAX_RATE),
    rooms: getRandomInteger(MAX_ROOMS),
    guests: getRandomInteger(MAX_GUESTS),
    cost: 80,
    features: getRandomSubArray(features),
    owner: {
      avatar: `${AVATAR_URL}/${Math.random()}`,
      name: `Mark`,
      isSuper: false
    }
  },
  {
    id: `3`,
    city: `Amsterdam`,
    title: `Canal View Prinsengracht`,
    photos: [`/img/apartment-02.jpg`, ...generatePhotos()],
    description: [
      `This spacious, square office has matching metal and plastic furniture.
        The floor is carpeted and the walls are painted with a paneled dado.
        Light is provided by wall lamps and a ceiling light.`,
      `The room is done in a vintage theme in warm colors and overall looks like an old castle.
        Among the first things one notices walking in is art supplies on the desk.`
    ],
    isPremium: false,
    housingType: getRandomElement(Object.values(HOUSING_TYPE)),
    rate: getRandomInteger(MAX_RATE),
    rooms: getRandomInteger(MAX_ROOMS),
    guests: getRandomInteger(MAX_GUESTS),
    cost: 132,
    features: getRandomSubArray(features),
    owner: {
      avatar: `${AVATAR_URL}/${Math.random()}`,
      name: `Julia`,
      isSuper: false
    }
  },
  {
    id: `4`,
    city: `Amsterdam`,
    title: `Nice, cozy, warm big bed apartment`,
    photos: [`/img/apartment-03.jpg`, ...generatePhotos()],
    description: [
      `This average-sized, square dining room has matching wooden furniture.`,
      `The seating is cushioned.`,
      `The floor is tiled and the walls are painted and decorated with a wallpaper border.`,
      `Light is provided by floor lamps and a ceiling light.`,
      `The room is done in colors that remind you of a coffee shop and overall looks very modern.
        Among the first things one notices walking in is a strange clock.`
    ],
    isPremium: true,
    housingType: getRandomElement(Object.values(HOUSING_TYPE)),
    rate: getRandomInteger(MAX_RATE),
    rooms: getRandomInteger(MAX_ROOMS),
    guests: getRandomInteger(MAX_GUESTS),
    cost: 180,
    features: getRandomSubArray(features),
    owner: {
      avatar: `${AVATAR_URL}/${Math.random()}`,
      name: `Tom`,
      isSuper: true
    }
  }
];
