//Component Tweet Context
import { createContext } from "react";
import { useState } from "react";

export const TweetContext = createContext(null);

const TweetProvider = ({ children }) => {
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [numOfRetweets, setNumOfRetweets] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);

  return (
    <TweetContext.Provider
      value={{
        isRetweetedByCurrentUser: isRetweeted,
        isLikedByCurrentUser: isLiked,
        setIsLiked,
        numOfLikes,
        setNumOfLikes,
        numOfRetweets,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export default TweetProvider;
