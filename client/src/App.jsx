import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { Auth, ChannelContainer, ChannelListContainer } from "./components";
// for quick better looking chat app
/**
 * @todo fix needed
 * Failed to parse source map from '/Users/jaykim/Documents/clone-practice/medical-pager/client
 * /node_modules/stream-chat-react/dist/css/index.css.map' file: Error: ENOENT: no such file or directory,
 * open '/Users/jaykim/Documents/clone-practice/medical-pager/client/node_modules/stream-chat-react/dist/css/index.css.map'
 */
import "stream-chat-react/dist/css/index.css";
import "./App.css";

const cookies = new Cookies();

// from stream
const apiKey = "jcfv7cm8s2ua";
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
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setCreateType={setCreateType}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          isEditing={isEditing}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;
