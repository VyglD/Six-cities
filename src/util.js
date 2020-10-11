import moment from "moment";

export const getSystemFormattedDate = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

export const getHumanFormattedDate = (date) => {
  return moment(date).format(`MMMM YYYY`);
};
