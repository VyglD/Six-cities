import {RATE_COEFFICIENT} from "./const";
import moment from "moment";

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

export {
  getSystemFormattedDate,
  getHumanFormattedDate,
  getRateVisualisation,
  extend,
  getArraysDifference,
};
