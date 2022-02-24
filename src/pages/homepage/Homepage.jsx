import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/SideBar";
import "./homepage.css";
import { useSelector } from "react-redux";

export default function Homepage() {
  const posts = useSelector((state) => state.posts);
  console.log(posts);

  return (
    <>
      {/* <Header /> */}
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
