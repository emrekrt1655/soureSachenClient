import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/SideBar";
import { useSelector } from "react-redux";
import "./homepage.css";
import SideBarLeft from "../../components/sidebarleft/SideBarLeft";
import Topbar from "../../components/topbar/Topbar";

export default function Homepage() {
  const { authReducer, postReducer, topicReducer, likeReducer } = useSelector(
    (state) => state
  );
  const postData = postReducer?.data;
  const topicData = topicReducer?.data;
  const likeData = likeReducer?.data;
  return (
    <>
      <Topbar />
      <div className="home">
        {authReducer?.user && <SideBarLeft />}
        <Posts topicData={topicData} postData={postData} likeData={likeData} />
        <Sidebar />
      </div>
    </>
  );
}
