import styled from "styled-components";
import { TweetContext } from "../TweetContext";
import { useContext } from "react";

import Heart from "./Heart";

const LikeButton = ({ size = 40, isLiked }) => {
  const heartSize = size * 0.6;

  return (
    <Wrapper style={{ width: size, height: size }}>
      <Heart width={heartSize} isToggled={isLiked} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LikeButton;
