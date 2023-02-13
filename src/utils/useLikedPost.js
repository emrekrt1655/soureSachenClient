export const useLikedPost = (postList) => {
let posts = postList
let newList = []

posts?.map((post) => {
    return newList.push({
      postId: post.postId,
      postText: post.text,
      count: post._count.comments + post._count.likes,
    });
  });

  newList?.sort(function (a, b) {
    return b.count - a.count;
  });

  const likedPost = newList?.find((post) => post.postId === newList[0]?.postId);

  return likedPost

}