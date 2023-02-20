export const sortByPostCount = (topics) => {
  let sortList = topics;

  sortList?.sort(function (topic1, topic2) {
    return topic2?._count.posts - topic1?._count.posts;
  });

  return sortList;
};
