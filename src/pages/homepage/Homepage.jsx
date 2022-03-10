import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/SideBar";
import "./homepage.css";
import { useSelector } from "react-redux";
import SideBarLeft from "../../components/sidebarleft/SideBarLeft";

export default function Homepage() {
  const posts = useSelector((state) => state.posts);
  console.log(posts);

  return (
    <>
      <div className="home">
        <SideBarLeft />
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
