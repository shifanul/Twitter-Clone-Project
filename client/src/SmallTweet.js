//Small Tweet Component
import styled from "styled-components";
import moment from "moment";
import ActionBar from "./Bar/Tweet/ActionBar";
import { TweetContext } from "./Bar/TweetContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SmallTweet = ({ status, author, media, id, timestamp, isLiked }) => {
  const [color, setColor] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [numOfRetweets, setNumOfRetweets] = useState(0);
  const navigate = useNavigate();

  const handleToggleLike = () => {
    // isLiked = !isLiked;
    !isLiked ? setNumOfLikes(numOfLikes + 1) : setNumOfLikes(numOfLikes - 1);
  };

  return (
    <Wrapper>
      <Infom onClick={() => navigate(`/tweet/${id}`)}>
        <Div>
          <Avatar src={author.avatarSrc} />
          <Person
            onClick={(ev) => {
              ev.stopPropagation();
              navigate(`/${author.handle}`);
            }}
          >
            <p>{author.displayName}</p>
            <Handle>
              @{author.handle}
              {moment(timestamp).format(" ∙ MMM Do")}
            </Handle>
          </Person>
        </Div>
        <BottomHalf>
          <Information>
            <p>{status}</p>
            {media[0] && <Info src={media[0].url} />}
          </Information>
        </BottomHalf>
      </Infom>
      <Stats>
        <Label>{numOfRetweets}</Label> Retweets <Label>{numOfLikes}</Label>
        Likes
      </Stats>

      <Button
        onClick={() => handleToggleLike(setColor(!color))}
        style={{ background: color ? "red" : "white" }}
      >
        Like
      </Button>
      {/* <ActionBar
        // isRetweetedByCurrentUser={isRetweetedByCurrentUser}
        isLiked={isLiked}
      /> */}
    </Wrapper>
  );
};

const Button = styled.button`
  /* &:disabled {
    background: red;
  }
  background: white; */
  /* background: ${(props) => (props.disabled ? "red" : "white")}; */
`;

const Infom = styled.div``;

const Stats = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1%;
  margin-left: 68px;
  margin-bottom: 10px;
  color: rgb(101, 119, 134);
  font-family: sans-serif;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 1%;
  color: black;
  :last-child {
    margin-left: 2%;
  }
`;

const Div = styled.div`
  display: flex;
`;

const BottomHalf = styled.div`
  margin-left: 68px;
`;

const Handle = styled.p`
  font-weight: 400;
  font-size: 17px;
  color: gray;
  margin-left: 5px;
`;

const Person = styled.span`
  margin-left: 15px;
  font-size: 23px;
  font-weight: 600;
  font-family: sans-serif;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Information = styled.div`
  font-weight: 500;
  font-size: 23px;
  font-family: sans-serif;
`;

const Info = styled.img`
  border-radius: 30px;
  height: 400px;
  width: 700px;
`;

const Wrapper = styled.div`
  width: 800px;
  margin: 0 100px;
  padding: 0 0;
  border: 1px lightgray solid;
  border-top: none;
  padding: 1%;
`;

export default SmallTweet;
