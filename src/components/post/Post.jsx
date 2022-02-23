import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ img }) {
  return (
    <div className="post">
      <div className="posttextinfo">
        <div className="postInfo">
          <span className="postTitle">
            <Link to="/post/abc" className="link">
              Lorem ipsum dolor sit amet
            </Link>
          </span>
          <hr />
        </div>
        <p className="postDesc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
          officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
          fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
          atque, exercitationem quibusdam, reiciendis odio laboriosam?
        </p>

        <div className="extrainfo">
          <div className="postCats">
            <span className="postCat">
              <Link className="link" to="/posts?cat=Music">
                Music
              </Link>
            </span>
            <span className="postCat">
              <Link className="link" to="/posts?cat=Music">
                Life
              </Link>
            </span>
          </div>
          <div>
            <span className="postDate">1 hour ago</span>
          </div>
        </div>
        <div className="postActButton">
          <i class="far fa-hand-spock"></i>
          <i class="far fa-comment" style={{ margin: "2%" }}></i>
          <i class="fab fa-slideshare"></i>
        </div>
      </div>
      <img className="postImg" src={img} alt="" />
    </div>
  );
}
