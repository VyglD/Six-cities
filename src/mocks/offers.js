import {HousingType, CITIES} from "../const";

export const AVATAR_URL = `https://api.adorable.io/avatars/74`;
const BIG_NUMBER = 999;

const MAX_OFFERS = 4;
const MAX_PHOTOS = 6;
export const MAX_RATE = 5;
const MAX_ROOMS = 3;
const MAX_GUESTS = 4;
const MAX_PARAGRAPH = 4;

const description = (
  `An independent House, strategically located between
    Rembrand Square and National Opera,
    but where the bustle of the city comes
    to rest in this alley flowery and colorful.`
);

export const names = [
  `Kynan`,
  `Aariz`,
  `Beth`,
  `Roxy`,
  `Max`,
  `Tom`,
  `Varun`,
  `Rudy`,
  `Elara`,
  `Bob`
];

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

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generatePhotos = () => {
  return new Array(getRandomInteger(MAX_PHOTOS))
    .fill()
    .map(() => {
      return `https://loremflickr.com/260/200/interior?lock=${getRandomInteger(BIG_NUMBER)}`;
    });
};

export const getRandomElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const shuffleArray = (arr) => {
  return arr.slice().sort(() => {
    return 0.5 - Math.random();
  });
};

export const getRandomSubArray = (array) => {
  const length = array.length;
  const half = Math.floor(length / 2);
  const start = getRandomInteger(0, half);
  const end = getRandomInteger(half, length);

  return shuffleArray(array).slice(start, end);
};

export default getRandomSubArray(CITIES)
  .map((city) => {
    return new Array(getRandomInteger(MAX_OFFERS))
      .fill()
      .map((_, index) => {
        return {
          id: `${city}-${index}`,
          city,
          title: `Mock Title ${city}-${index}`,
          photos: [...generatePhotos()],
          description: new Array(getRandomInteger(MAX_PARAGRAPH)).fill(description),
          isPremium: Boolean(getRandomInteger()),
          housingType: getRandomElement(Object.values(HousingType)),
          rate: getRandomInteger(MAX_RATE),
          rooms: getRandomInteger(MAX_ROOMS),
          guests: getRandomInteger(MAX_GUESTS),
          cost: getRandomInteger(BIG_NUMBER),
          features: getRandomSubArray(features),
          owner: {
            avatar: `${AVATAR_URL}/${Math.random()}`,
            name: getRandomElement(names),
            isSuper: Boolean(getRandomInteger()),
          }
        };
      });
  })
  .reduce((offersByCity, result) => {
    result.push(...offersByCity);

    return result;
  }, []);

