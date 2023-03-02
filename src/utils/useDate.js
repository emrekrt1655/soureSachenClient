import moment from "moment";
export const useDate = (day) => {
  let date = moment(day).fromNow();
  if (
    date?.includes("years") ||
    date?.includes("months") ||
    date?.includes("month") ||
    date?.includes("weeks") ||
    date?.includes("year") ||
    date?.includes("week")
  ) {
    date = moment(day).format("DD.MM.YYYY");
  } else if (date === "7 days ago") {
    date = "last week";
  } else if (date === "14 days ago") {
    date = "two weeks ago";
  } else if (date === "21 days ago") {
    date = "three weeks ago";
  } else if (date === "a day ago") {
    date = "yesterday";
  }
  return date;
};