import moment from "moment"
export const useDate = (day) =>  {
    let date = moment(day).fromNow()
    if (date?.includes("years") || date?.includes("months") || date?.includes("month") ||  date?.includes("weeks") || date?.includes("year") || date?.includes("week")) {
       date = moment(date).format("DD.MM.YYYY")
    } else if( date === "7 dates ago") {
      date = "last week"
    } else if( date === "a day ago"){
      date = "yesterday"
    }
    return date
}