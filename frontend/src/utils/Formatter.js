//Get formatted strings for displaying dates
export const formatDate = (date) => {
  let dateString;
  const today = new Date();
  const yesterday = new Date(Date.now() - 86400000); //86400000 milliseconds to subtract 1 full day

  date = new Date(date);

  //Show same day dates as Today at [time]
  if (date.toDateString() === today.toDateString()) {
    dateString = "Today at " + date.toLocaleTimeString([], {hour: "numeric", minute: "numeric"});
  }
  //Show previous day dates as Yesterday at [time]
  else if (date.toDateString() === yesterday.toDateString()) {
    dateString = "Yesterday at " + date.toLocaleTimeString([], {hour: "numeric", minute: "numeric"});
  }
  //Show other dates as DD/MM/YYYY
  else {
    dateString = date.toLocaleDateString([], {year: "numeric", month: "2-digit", day: "2-digit"});
  }

  return dateString;
};


//Get whether a string strictly consists of alphanumeric characters
export const isAlphaNumeric = (string) => {
  const regEx = /^[a-z0-9]+$/i;

  return string.match(regEx);
};