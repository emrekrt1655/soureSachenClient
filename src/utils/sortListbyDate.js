export const sortListbyDate = (arr) => {
  let sortedList = arr;

  sortedList?.sort(function (topic1, topic2) {
    let dateTopic1 = new Date(topic1.createdAt);
    let dateTopic2 = new Date(topic2.createdAt);
    return dateTopic2 - dateTopic1;
  });

  return sortedList;
};


export const sortListByDay = (arr) => {
  let sortedList = arr;

  sortedList?.sort(function (topic1, topic2) {
    let dateTopic1 = new Date(topic1.createdAt).getUTCDate();
    let dateTopic2 = new Date(topic2.createdAt).getUTCDate();
    return dateTopic2 - dateTopic1;
  });

  return sortedList;

}