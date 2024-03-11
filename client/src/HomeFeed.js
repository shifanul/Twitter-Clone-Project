import { useState, useEffect, useContext } from "react";
import SmallTweet from "./SmallTweet";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { COLORS } from "./constants";
import Error from "./Error";

const HomeFeed = () => {
  const [feed, setFeed] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);
  const [status, setStatus] = useState("loading");
  const [count, setCount] = useState(280);
  const [value, setValue] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setFeed(data);
        setStatus("idle");
      })
      .catch((err) => {
        setError(err);
      });
    setIsLoading(false);
  }, [submit]);

  const handleClick = (ev) => {
    ev.preventDefault();
    fetch("/api/tweet", {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: value }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .then(setSubmit(true))
      .catch((err) => {
        setError(err);
      });
    setIsLoading(false);
  };
  if (error) {
    return <Error />;
  }
  if (status === "loading") {
    return <p>Loading</p>;
  }
  return (
    !isLoading &&
    status === "idle" && (
      <Wrapper>
        <Title>Home</Title>
        {currentUser && (
          <Area>
            <User src={currentUser.profile.avatarSrc} />
            <Text
              placeholder={"What's happening"}
              // value={value}
              onChange={(ev) => {
                setCount(280 - ev.target.value.length);
                setValue(ev.target.value);
              }}
            ></Text>
            <Count
              style={{
                color:
                  count < 55 && count > 1
                    ? "	#ffd700"
                    : count <= 0
                    ? "red"
                    : "lightgray",
              }}
            >
              {count}
            </Count>
            <Button disabled={count <= 0} onClick={handleClick}>
              Meow
            </Button>
          </Area>
        )}
        <Tweets>
          {feed &&
            Object.values(feed.tweetsById).map((tweet) => {
              console.log(tweet);
              return (
                <>
                  <SmallTweet
                    status={tweet.status}
                    author={tweet.author}
                    timestamp={tweet.timestamp}
                    media={tweet.media}
                    id={tweet.id}
                    isLiked={tweet.isLiked}
                  />
                </>
              );
            })}
        </Tweets>
      </Wrapper>
    )
  );
};

const Tweets = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const User = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  padding: 0;
  margin-top: 5px;
  margin-left: 105px;
  position: absolute;
`;

const Area = styled.div`
  width: 800px;
`;

const Button = styled.button`
  width: fit-content;
  border: none;
  background-color: ${COLORS.primary};
  color: white;
  font-size: 19px;
  padding: 10px 13px;
  border-radius: 20px;
  display: flex;
  position: absolute;
  margin-top: -78px;
  margin-left: 840px;
`;

const Count = styled.span`
  position: absolute;
  margin-top: -64px;
  margin-left: 810px;
`;

const Text = styled.textarea`
  font-size: 20px;
  font-family: sans-serif;
  height: 200px;
  width: 744px;
  padding: 10px;
  padding-left: 65px;
  padding-top: 18px;
  margin-left: 101px;
  resize: none;

  border: 1px lightgray solid;
  border-bottom: 10px lightgray solid;
  outline: none;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 600;
  width: 800px;
  margin: 0 100px;
  font-family: sans-serif;
  border: 1px lightgray solid;
  border-top: none;
  padding: 1%;
`;

export default HomeFeed;
