import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { getTopics } from "./redux/actions//topicAction";
import { getPosts } from "./redux/actions/postAction";
import { getUsers } from "./redux/actions/userAction";
import { getLikes } from "./redux/actions/likeAction";
import { getFollowers } from "./redux/actions/followerAction";

import Alert from "./components/alert/Alert";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import TopicPosts from "./pages/TopicPosts/TopicPosts";
import UserProfil from "./pages/userProfil/UserProfil";
import Single from "./pages/single/Single";

function App() {
  const { authReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const access_token = authReducer?.access_token


  useEffect(() => {
    dispatch(refreshToken());
    dispatch(getTopics());
    dispatch(getUsers());
    dispatch(getPosts());
    dispatch(getLikes());
  }, [dispatch])

  useEffect(() => access_token && dispatch(getFollowers(access_token)), [dispatch, access_token])
  }, [dispatch]);


  return (
    <Router>
      <Alert />
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
        <Route path="/settings">
          {authReducer?.user ? <Settings /> : <Login />}
        </Route>
        <Route exact path="/:topicId" component={TopicPosts} />
        <Route exact path="/userProfile/:userId" component={UserProfil} />
        <Route exact path="/post/:postId" component={Single} />
      </Switch>
    </Router>
  );
}

export default App;
