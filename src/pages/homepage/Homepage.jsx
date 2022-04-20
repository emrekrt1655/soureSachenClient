import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/SideBar";
import { useSelector } from "react-redux";
import "./homepage.css";
import SideBarLeft from "../../components/sidebarleft/SideBarLeft";
import Topbar from "../../components/topbar/Topbar";

export default function Homepage() {
  const { authReducer, postReducer, topicReducer, likeReducer, followerReducer } = useSelector(
    (state) => state
  );
  const postData = postReducer?.data;
  const topicData = topicReducer?.data;
  const likeData = likeReducer?.data;
  const user = authReducer?.user;
  const access_token = authReducer?.access_token;
  const followerData = followerReducer?.data;
  return (
    <>
      <Topbar />
      <div className="home">
        {user && <SideBarLeft  followerData={followerData} />}
        <Posts topicData={topicData} postData={postData} likeData={likeData} />
        <Sidebar user={user} access_token={access_token}  postData={postData} topicData={topicData} likeData={likeData} />
      </div>
    </>
  );
}
