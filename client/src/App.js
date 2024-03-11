import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import HomeFeed from "./HomeFeed";
import Tweet from "./TweetDetails";
import Profile from "./Profile";
import Bookmarks from "./Bookmarks";
import Notifications from "./Notifications";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const App = () => {
  return (
    <BrowserRouter>
      <Feed>
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomeFeed />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/tweet/:tweetId" element={<Tweet />} />
          <Route path="/:profileId" element={<Profile />} />
        </Routes>
      </Feed>
    </BrowserRouter>
  );
};

const Feed = styled.span`
  display: flex;
  flex-direction: row;
`;

export default App;
