import { Link } from "react-router-dom";
import "./likedposts.css";

export default function Post({img}) {
  return (
    <div className="postlked">
      <img
        className="postImgliked"
        src="https://images.pexels.com/photos/4916559/pexels-photo-4916559.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
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
        <div>
          <i className="far fa-hand-spock"></i>
          <i className="far fa-comment"  style={{margin:"2%"}}></i>
          <i className="fab fa-slideshare"  ></i>
        </div>
      </div>  
    </div>
  );
}