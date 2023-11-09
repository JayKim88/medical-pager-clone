import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { Auth, ChannelContainer, ChannelListContainer } from "./components";

import "./App.css";

const cookies = new Cookies();

// from stream
const apiKey = "zdyvz7gbmp3b";
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

/**
 * @description DB 에 저장이 아닌, 쿠키에 사용자 정보 및 토큰 저장하여 등록, 로그인 하는 방식인 것 같음.
 */

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("userName"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken
  );
}

const App = () => {
  if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
