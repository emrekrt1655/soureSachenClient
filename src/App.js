import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { getTopics } from "./redux/actions//topicAction";
import { getPosts } from "./redux/actions/postAction";
import { getUsers } from "./redux/actions/userAction";
import { getLikes } from "./redux/actions/likeAction";
import { getFollowers } from "./redux/actions/followerAction";
import io from "socket.io-client";

import { Alert } from "./components/alert/Alert";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import TopicPosts from "./pages/TopicPosts/TopicPosts";
import UserProfil from "./pages/userProfil/UserProfil";
import Single from "./pages/single/Single";
import Settings from "./pages/settings/Settings";
import ChangePassword from "./pages/changePassword/ChangePassword";
import Active from "./pages/active/Active";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import Home from "@mui/icons-material/Home";

function App() {
  const { authReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const access_token = authReducer?.access_token;

  useEffect(() => {
    dispatch(refreshToken());
    dispatch(getTopics());
    dispatch(getUsers());
    dispatch(getPosts());
    dispatch(getLikes());
  }, [dispatch]);

  useEffect(
    () => access_token && dispatch(getFollowers(access_token)),
    [dispatch, access_token]
  );

  //  useEffect(() => {
  //    const socket = io()
  //    dispatch({ type: 'SOCKET', payload: socket })
  //    return () => { socket.close() }
  //  },[dispatch])

  return (
    <Router>
      <Alert />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/posts" element={<Homepage />} />
        <Route
          path="/register"
          element={authReducer?.user ? <Homepage /> : <Register />}
        />

        <Route
          path="/login"
          element={authReducer?.user ? <Homepage /> : <Login />}
        />

        <Route
          exact
          path="/settings/:userId"
          element={authReducer?.user ? <Settings /> : <Login />}
        />

        <Route
          path="/settings/changePassword/:userId"
          element={authReducer?.user ? <ChangePassword /> : <Login />}
        />

        <Route exact path="/:topicId" element={<TopicPosts />} />
        <Route exact path="/userProfile/:userId" element={<UserProfil />} />
        <Route exact path="/post/:postId" element={<Single />} />
        <Route exact path="/active/:slug" element={<Active />} />
        <Route exact path="/reset_password/:slug" element={<ResetPassword />} />
        <Route exact path="/forgot/password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
