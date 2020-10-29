import {RATE_COEFFICIENT} from "./const";
import moment from "moment";

export const getSystemFormattedDate = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

export const getHumanFormattedDate = (date) => {
  return moment(date).format(`MMMM YYYY`);
};

export const getRateVisualisation = (rate) => {
  return {width: `${rate * RATE_COEFFICIENT}%`};
};

export const extend = (...args) => {
  return Object.assign({}, ...args);
};

export const getArraysDifference = (one, two) => {
  return one.filter((i) => !two.includes(i))
    .concat(two.filter((i) => !one.includes(i)));
};

export const isArraysEqual = (one, two) => {
  return getArraysDifference(one, two).length === 0;
};
