import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/SideBar";
import { useSelector } from "react-redux";
import "./homepage.css";
import SideBarLeft from "../../components/sidebarleft/SideBarLeft";

export default function Homepage() {
  const { authReducer, postReducer, topicReducer } = useSelector(
    (state) => state
  );
  const postData = postReducer?.data;
  const topicData = topicReducer?.data;
  return (
    <>
      <div className="home">
        {authReducer?.user && <SideBarLeft />}
        <Posts topicData={topicData} postData={postData} />
        <Sidebar />
      </div>
    </>
  );
}
