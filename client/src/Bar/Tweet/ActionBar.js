import styled from "styled-components";
import { useContext } from "react";

import LikeButton from "../LikeButton";
import Action from "./Action";
import TweetActionIcon from "./TweetActionIcon";
import { useState } from "react";

const ActionBar = ({ isLiked }) => {
  const [numOfLikes, setNumOfLikes] = useState(0);
  // const [isLiked, setIsLiked] = useState(false);
  console.log(isLiked);
  const handleToggleLike = () => {
    isLiked = !isLiked;
    !isLiked ? setNumOfLikes(numOfLikes + 1) : setNumOfLikes(numOfLikes - 1);
    console.log(isLiked);
  };

  // const handleToggleRetweet = () => {
  //   setIsRetweeted(!isRetweeted);
  //   !isRetweeted
  //     ? setNumOfRetweets(numOfRetweets + 1)
  //     : setNumOfRetweets(numOfRetweets - 1);
  // };

  return (
    <Wrapper>
      <Action color="rgb(27, 149, 224)" size={40}>
        <TweetActionIcon kind="reply" />
      </Action>
      <Action
        color="rgb(23, 191, 99)"
        size={40}
        // onClickFunc={handleToggleRetweet}
      >
        <TweetActionIcon
          kind="retweet"
          // color={isRetweetedByCurrentUser ? "rgb(23, 191, 99)" : undefined}
        />
      </Action>
      <Action color="rgb(224, 36, 94)" size={40} onClickFunc={handleToggleLike}>
        <LikeButton isLiked={isLiked} />
      </Action>

      <Action color="rgb(27, 149, 224)" size={40}>
        <TweetActionIcon kind="share" />
      </Action>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 48px;
`;

export default ActionBar;
