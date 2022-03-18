import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/SideBar";
import "./homepage.css";
import SideBarLeft from "../../components/sidebarleft/SideBarLeft";

export default function Homepage() {
  return (
    <>
      <div className="home">
        <SideBarLeft />
        <Posts />
        <Sidebar />
      </div>
    </>
  );
}
