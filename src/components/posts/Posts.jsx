import NewPostAdd from "../newPostAdd/newPostAdd";
import Post from "../post/Post";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./posts.css";
import { getPosts } from "../../redux/actions/postAction";
import { getTopics } from "../../redux/actions/topicAction";

export default function Posts() {
  const dispatch = useDispatch();
  const { postReducer, topicReducer } = useSelector((state) => state);
  const postData = postReducer?.data;
  const topicData = topicReducer?.data;
  useEffect(() => {
    dispatch(getTopics());
    dispatch(getPosts());
  }, [dispatch]);

  

  
  return (
    <div className="posts">
      <NewPostAdd />
      {postData &&
        postData.map((p) => (
          <Post topicData={topicData} post={p} key={p.postId} />
        ))}
    </div>
  );
}
