import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { getTopics } from "./redux/actions//topicAction";
import { getPosts } from "./redux/actions/postAction";
import { getUsers } from "./redux/actions/userAction";
import { getLikes } from "./redux/actions/likeAction";
import { getFollowers } from "./redux/actions/followerAction";

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
import Topics from "./pages/allTopics/Topics";
import UserTopics from "./pages/allTopics/UserTopics";

function App() {
  const {
    authReducer,
    postReducer,
    topicReducer,
    likeReducer,
    followerReducer,
    userReducer,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const access_token = authReducer?.access_token;

  useEffect(() => {
    dispatch(refreshToken());
    dispatch(getTopics());
    dispatch(getUsers());
    dispatch(getPosts());
    dispatch(getLikes());
    access_token && dispatch(getFollowers(access_token));
  }, [access_token, dispatch]);

  //  useEffect(() => {
  //    const socket = io()
  //    dispatch({ type: 'SOCKET', payload: socket })
  //    return () => { socket.close() }
  //  },[dispatch])

  return (
    <Router>
      <Alert />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Homepage
              access_token={access_token}
              followerData={followerReducer?.data}
              likeData={likeReducer?.data}
              user={authReducer?.user}
              postData={postReducer?.data}
              topicData={topicReducer?.data}
            />
          }
        />
        <Route
          path="/posts"
          element={
            <Homepage
              access_token={access_token}
              followerData={followerReducer?.data}
              likeData={likeReducer?.data}
              user={authReducer?.user}
              postData={postReducer?.data}
              topicData={topicReducer?.data}
            />
          }
        />
        <Route
          path="/register"
          element={
            authReducer?.user ? (
              <Homepage
                access_token={access_token}
                followerData={followerReducer?.data}
                likeData={likeReducer?.data}
                user={authReducer?.user}
                postData={postReducer?.data}
                topicData={topicReducer?.data}
              />
            ) : (
              <Register />
            )
          }
        />

        <Route
          path="/login"
          element={authReducer?.user ? <Homepage /> : <Login />}
        />

        <Route
          exact
          path="/settings/:userId"
          element={
            authReducer?.user ? (
              <Settings authReducer={authReducer} />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/settings/changePassword/:userId"
          element={
            authReducer?.user ? (
              <ChangePassword
                user={authReducer?.user}
                access_token={access_token}
              />
            ) : (
              <Login />
            )
          }
        />

        <Route
          exact
          path="/:topicId"
          element={
            <TopicPosts
              likeData={likeReducer?.data}
              user={authReducer?.user}
              postData={postReducer?.data}
              topicData={topicReducer?.data}
              access_token={access_token}
            />
          }
        />
        <Route
          exact
          path="/:userId/topics"
          element={
            <UserTopics
              posts={postReducer?.data}
              followerData={followerReducer?.data}
              users={userReducer?.data}
              topics={topicReducer?.data}
              authUser={authReducer?.user}
              access_token={access_token}
            />
          }
        />
        <Route
          exact
          path="/:userId/userProfile"
          element={
            authReducer?.user ? (
              <UserProfil
                likeData={likeReducer?.data}
                posts={postReducer?.data}
                topicData={topicReducer?.data}
                users={userReducer?.data}
                followerData={followerReducer?.data}
                authUser={authReducer?.user}
                access_token={access_token}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          exact
          path="/post/:postId"
          element={
            <Single
              likeData={likeReducer?.data}
              user={authReducer?.user}
              postData={postReducer?.data}
              topicData={topicReducer?.data}
              users={userReducer?.data}
              access_token={access_token}
            />
          }
        />
        <Route
          exact
          path="/topics"
          element={
            <Topics
              posts={postReducer?.data}
              followerData={followerReducer?.data}
              users={userReducer?.data}
              topics={topicReducer?.data}
              authUser={authReducer?.user}
              access_token={access_token}
            />
          }
        />
        <Route exact path="/active/:slug" element={<Active />} />
        <Route exact path="/reset_password/:slug" element={<ResetPassword />} />
        <Route
          exact
          path="/forgot/password"
          element={
            <ForgotPassword
              user={authReducer?.user}
              access_token={access_token}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
