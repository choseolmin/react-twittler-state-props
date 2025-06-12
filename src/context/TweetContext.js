import React, { createContext, useState, useContext, useEffect } from "react";

const TweetContext = createContext();

export const TweetProvider = ({ children }) => {
  // localStorage에서 초기 데이터를 가져오거나 기본값 사용
  const [tweets, setTweets] = useState(() => {
    const savedTweets = localStorage.getItem("tweets");
    return savedTweets
      ? JSON.parse(savedTweets)
      : [
          {
            id: 1,
            username: "Bob",
            name: "Bob",
            content: "안녕하세요!",
            profileImage: "https://picsum.photos/200",
            date: "2024-02-20",
            isLiked: false,
            likeCount: 0,
            replies: [],
          },
          {
            id: 2,
            username: "Alice",
            name: "Alice",
            content: "반갑습니다!",
            profileImage: "https://picsum.photos/201",
            date: "2024-02-20",
            isLiked: false,
            likeCount: 0,
            replies: [],
          },
        ];
  });

  // tweets가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  const addTweet = (newTweet) => {
    setTweets((prevTweets) => [
      {
        id: Date.now(),
        username: "Bob",
        name: "Bob",
        content: newTweet,
        profileImage: "https://picsum.photos/200",
        date: new Date().toISOString().split("T")[0],
        isLiked: false,
        likeCount: 0,
        replies: [],
      },
      ...prevTweets,
    ]);
  };

  const toggleLike = (tweetId) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === tweetId
          ? {
              ...tweet,
              isLiked: !tweet.isLiked,
              likeCount: tweet.isLiked ? tweet.likeCount - 1 : tweet.likeCount + 1,
            }
          : tweet
      )
    );
  };

  const addReply = (tweetId, replyContent) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === tweetId
          ? {
              ...tweet,
              replies: [
                ...tweet.replies,
                {
                  id: Date.now(),
                  username: "Bob",
                  name: "Bob",
                  content: replyContent,
                  profileImage: "https://picsum.photos/200",
                  date: new Date().toISOString().split("T")[0],
                },
              ],
            }
          : tweet
      )
    );
  };

  const deleteReply = (tweetId, replyId) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === tweetId
          ? {
              ...tweet,
              replies: tweet.replies.filter((reply) => reply.id !== replyId),
            }
          : tweet
      )
    );
  };

  const deleteTweet = (tweetId) => {
    setTweets((prevTweets) => prevTweets.filter((tweet) => tweet.id !== tweetId));
  };

  return (
    <TweetContext.Provider
      value={{
        tweets,
        addTweet,
        toggleLike,
        addReply,
        deleteReply,
        deleteTweet,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export const useTweet = () => {
  const context = useContext(TweetContext);
  if (!context) {
    throw new Error("useTweet must be used within a TweetProvider");
  }
  return context;
}; 