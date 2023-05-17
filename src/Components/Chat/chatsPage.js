import React from 'react';
import { PrettyChatWindow } from "react-chat-engine-pretty";

const ChatsPage = (props) => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId="8e16e1f7-14bd-4a0e-b265-70d4bbf28d84"
        username={props.user.username} // adam
        secret={props.user.secret} // pass1234
        style={{ height: "100%" }}
      >
      
      </PrettyChatWindow>
    </div>
  );
};

export default ChatsPage;
