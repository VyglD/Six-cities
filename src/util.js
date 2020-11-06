import moment from "moment";
import {RATE_COEFFICIENT, Key} from "./const";

const getSystemFormattedDate = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

const getHumanFormattedDate = (date) => {
  return moment(date).format(`MMMM YYYY`);
};

const getRateVisualisation = (rate) => {
  return {width: `${Math.round(rate) * RATE_COEFFICIENT}%`};
};

const extend = (...args) => {
  return Object.assign({}, ...args);
};

const getArraysDifference = (one, two) => {
  return one.filter((i) => !two.includes(i))
    .concat(two.filter((i) => !one.includes(i)));
};

const isSelectKeyDown = (evt) => {
  return evt.key === Key.ENTER || evt.key === Key.SPACE;
};

const isControlKeyDown = (evt) => {
  return evt.key === Key.TAB || evt.key === Key.UP || evt.key === Key.DOWN;
};

const isEscKeyDown = (evtKey) => {
  return evtKey === Key.ESC;
};

const getNextArrayElement = function (currentIndex, arr) {
  return arr[(currentIndex + 1) % arr.length];
};

const getPrevArrayElement = function (currentIndex, arr) {
  return arr[(currentIndex + (arr.length - 1)) % arr.length];
};

export {
  getSystemFormattedDate,
  getHumanFormattedDate,
  getRateVisualisation,
  extend,
  getArraysDifference,
  isSelectKeyDown,
  isControlKeyDown,
  isEscKeyDown,
  getNextArrayElement,
  getPrevArrayElement,
};
