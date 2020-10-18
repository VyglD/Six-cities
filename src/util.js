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

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};
