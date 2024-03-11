//Tweet Component
import styled from "styled-components";
import ActionBar from "./Bar/Tweet/ActionBar";
import { TweetContext } from "./Bar/TweetContext";
import { useContext, useState, useEffect } from "react";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import Error from "./Error";

const Tweet = () => {
  const navigate = useNavigate();
  const [tweet, setTweet] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [numOfRetweets, setNumOfRetweets] = useState(0);
  const { tweetId } = useParams();
  const [color, setColor] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const handleToggleLike = () => {
    // isLiked = !isLiked;
    !isLiked ? setNumOfLikes(numOfLikes + 1) : setNumOfLikes(numOfLikes - 1);
  };

  useEffect(() => {
    console.log(tweetId);
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTweet(data.tweet);
        console.log(data);
      })
      .catch((err) => {
        setError(err);
      });
    setIsLoading(false);
  }, []);

  if (error) {
    return <Error />;
  }
  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    !isLoading && (
      <>
        {tweet && (
          <Wrapper>
            <Div>
              <Avatar src={tweet.author.avatarSrc} />
              <Person
                onClick={(ev) => {
                  ev.stopPropagation();
                  navigate(`/${tweet.author.handle}`);
                }}
              >
                <p>{tweet.author.displayName}</p>
                <Handle>@{tweet.author.handle}</Handle>
              </Person>
            </Div>
            <BottomHalf>
              <Information>
                <p>{tweet.status}</p>
                {tweet.media[0] && <Info src={tweet.media[0].url} />}
              </Information>
              <Footer>
                <p>
                  {moment(tweet.timestamp).format("LT ∙ MMM Do YYYY")} ∙ Critter
                  web app
                </p>
              </Footer>
              <Button
                onClick={() => handleToggleLike(setColor(!color))}
                style={{ background: color ? "red" : "white" }}
              >
                Like
              </Button>
              <Span>{numOfLikes}</Span>
              {/* <Stats>
                <Label>{numOfRetweets}</Label> Retweets{" "}
                <Label>{numOfLikes}</Label>
                Likes
              </Stats>
              <ActionBar
                isRetweetedByCurrentUser={isRetweetedByCurrentUser}
                isLikedByCurrentUser={isLikedByCurrentUser}
              /> */}
            </BottomHalf>
          </Wrapper>
        )}
      </>
    )
  );
};

const Button = styled.button`
  /* &:disabled {
    background: red;
  }
  background: white; */
  /* background: ${(props) => (props.disabled ? "red" : "white")}; */
`;

const Span = styled.span`
  margin-left: 5px;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  color: rgb(101, 119, 134);
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
  margin-bottom: 100px;
`;

const Handle = styled.p`
  font-weight: 400;
  font-size: 17px;
  color: gray;
`;

const Person = styled.span`
  margin-left: 15px;
  font-size: 20px;
  font-weight: 600;
  font-family: sans-serif;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Information = styled.div`
  font-weight: 600;
  font-size: 27px;
  font-family: sans-serif;
`;

const Footer = styled.div`
  color: gray;
  border-bottom: 1px lightgray solid;
  margin-bottom: 10px;
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
`;

export default Tweet;
