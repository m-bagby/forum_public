import Filter from "bad-words";

//Replace the characters of bad words with asterisks
export const filterProfanity = (string) => {
  const filter = new Filter();

  return filter.clean(string);
};

//Get whether a string has bad words
export const containsProfanity = (string) => {
  const filter = new Filter();

  return filter.isProfane(string);
};

//Get whether a string is strictly alphanumeric
export const isAlphaNumeric = (string) => {
  const regEx = /^[a-z0-9]+$/i;

  return string.match(regEx);
};