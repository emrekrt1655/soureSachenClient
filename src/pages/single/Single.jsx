
import SinglePost from "../../components/singlePost/SinglePost";
import Sidebar from "../../components/sidebar/SideBar";
import "./single.css";

export default function Single() {
  return (
    <div className="single">
      <SinglePost />
      <Sidebar />
    </div>
  );
}