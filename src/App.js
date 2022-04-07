import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { getTopics } from "./redux/actions//topicAction";
import { getPosts } from "./redux/actions/postAction";
import { getUsers } from "./redux/actions/userAction";
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import TopicPosts from "./pages/TopicPosts/TopicPosts";

function App() {
  const { authReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    dispatch(getTopics());
    dispatch(getUsers());
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/posts">
          <Homepage />
        </Route>

        <Route path="/register">
          {authReducer?.user ? <Homepage /> : <Register />}
        </Route>
        <Route path="/login">
          {authReducer?.user ? <Homepage /> : <Login />}
        </Route>
        <Route path="/post/:id">
          <Single />
        </Route>
        <Route path="/write">{authReducer?.user ? <Write /> : <Login />}</Route>
        <Route path="/settings">
          {authReducer?.user ? <Settings /> : <Login />}
        </Route>
        <Route path="/topic/:topicId">
          <TopicPosts />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
