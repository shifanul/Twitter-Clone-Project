import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { COLORS } from "./constants";
import SmallTweet from "./SmallTweet";
import Error from "./Error";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [feed, setFeed] = useState(null);
  const { profileId } = useParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.profile);
      })
      .catch((err) => {
        setError(err);
      });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((data) => setFeed(data));
  });

  //console log current user to see what data you have
  if (error) {
    return <Error />;
  }
  return (
    !isLoading &&
    (profile ? (
      <>
        <Wrapper>
          <Border>
            <Banner src={profile.bannerSrc} />
            <Avatar src={profile.avatarSrc} />

            <Person>
              <DisplayName>{profile.displayName}</DisplayName>
              <Handle>@{profile.handle}</Handle>
              <Bio>{profile.bio}</Bio>
              <Location>
                <FiMapPin></FiMapPin> {profile.location}
              </Location>
              <Joined>
                {" "}
                <FiCalendar></FiCalendar> Joined{" "}
                {moment(profile.joined).format("MMM YYYY")}{" "}
              </Joined>
              <Follow>
                {profile.numFollowing} <Title>Following</Title>{" "}
                {profile.numFollowers} <Title>Followers</Title>
              </Follow>
              <Feeter>
                <MiddleBanner>Tweets</MiddleBanner>
                <MiddleBanner>Media</MiddleBanner>
                <MiddleBanner>Likes</MiddleBanner>
              </Feeter>
            </Person>
          </Border>
          <Tweets>
            {feed ? (
              Object.values(feed.tweetsById).map((tweet) => {
                return (
                  <>
                    <SmallTweet
                      status={tweet.status}
                      author={tweet.author}
                      timestamp={tweet.timestamp}
                      media={tweet.media}
                      id={tweet.id}
                    />
                  </>
                );
              })
            ) : (
              <p>"Loading"</p>
            )}
          </Tweets>
        </Wrapper>
      </>
    ) : (
      <p>"Loading"</p>
    ))
  );
};

const Border = styled.div`
  border: 1px lightgray solid;
  width: 801px;
`;

const Tweets = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-left: -100px;
  width: 10px;
`;

const Wrapper = styled.div`
  font-family: sans-serif;
  width: 800px;
`;

const Handle = styled.p`
  color: gray;
  font-weight: 400;
  font-size: 16px;
  margin: 0;
  padding: 0;
  margin-left: 20px;
`;

const Person = styled.span``;

const Avatar = styled.img`
  display: inline-block;
  height: 170px;
  width: 170px;
  border: 2px white solid;
  border-radius: 50%;
  margin-top: -30px;
  margin-left: 20px;
`;

const Banner = styled.img`
  width: 800px;
  display: flex;
  margin: -10px;
  margin-left: 0.2px;
`;

const DisplayName = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 0;
  padding-bottom: 0;
  margin-left: 20px;
`;

const Bio = styled.p`
  font-size: 17px;
  font-weight: bold;
  width: 800px;
  margin-left: 20px;
`;

const Location = styled.span`
  margin-right: 1%;
  color: gray;
  margin-left: 20px;
`;

const Joined = styled.span`
  color: gray;
  margin-left: 20px;
`;

const Follow = styled.p`
  font-weight: bold;
  margin-left: 22px;
`;

const Title = styled.span`
  font-weight: normal;
  margin-right: 1%;
  color: gray;
`;

const Feeter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 800px;
`;

const MiddleBanner = styled.button`
  &.active {
    border-bottom: 5px ${COLORS.primary} solid;
  }
  background-color: white;
  border: none;
  font-size: 20px;
  font-weight: bold;
  width: 800px;
  padding: 5%;
  padding-bottom: 5px;
  margin-right: 5px;
`;

export default Profile;
