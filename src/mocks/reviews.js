import
offers,
{
  BIG_NUMBER,
  names,
  getRandomInteger,
  getRandomElement
} from "./offers";
import {MAX_RATE} from "../const";

const MAX_TIME = new Date().getTime();
const MAX_COMMENTS_NUMBER = 3;

export default new Array(offers.length)
  .fill()
  .map((_, indexMajor) => {
    return new Array(getRandomInteger(MAX_COMMENTS_NUMBER))
      .fill()
      .map((__, indexMinor) => {
        return {
          offerId: offers[indexMajor].id,
          name: getRandomElement(names),
          photo: `https://loremflickr.com/75/75/face?lock=${getRandomInteger(BIG_NUMBER)}`,
          rate: getRandomInteger(MAX_RATE),
          date: new Date(getRandomInteger(MAX_TIME)),
          text: `Comment #${indexMajor}.${indexMinor}`
        };
      });
  })
  .reduce((reviewsByCity, result) => {
    result.push(...reviewsByCity);

    return result;
  }, []);
