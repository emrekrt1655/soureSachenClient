import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/SideBar";
import { useSelector } from "react-redux";
import "./homepage.css";
import SideBarLeft from "../../components/sidebarleft/SideBarLeft";
import Topbar from "../../components/topbar/Topbar";

export default function Homepage() {
  const { authReducer } = useSelector((state) => state);
  return (
    <>
      <Topbar />
      <div className="home">
        {authReducer?.user && <SideBarLeft />}
        <Posts />
        <Sidebar />
      </div>
    </>
  );
}
