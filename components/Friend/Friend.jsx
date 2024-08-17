import React, { useState, useContext } from "react";
import Image from "next/image";
import Style from "./Friend.module.css";
import NoUser from "../../assets/nousser.svg";
import Card from "./Card/Card";
import Chat from "./Chat/Chat";
import { ChatAppContext } from "../../Context/ChatAppContext";

const Friend = () => {
  const {
    sendMessage,
    account,
    friendMsg,
    friendLists,
    readMessage,
    userName,
    loading,
    currentUserName,
    currentUserAddress,
    readUser,
  } = useContext(ChatAppContext);
  return (
    <div className={Style.Friend}>
      <div className={Style.Friend_box}>
        <div className={Style.Friend_box_left}>
          {friendLists && friendLists?.length ? (
            <>
              {friendLists.map((el, i) => (
                <Card
                  key={i + 1}
                  el={el}
                  i={i}
                  readMessage={readMessage}
                  readUser={readUser}
                />
              ))}
            </>
          ) : (
            <div className={Style.noUser}>
              <p>You don't have any friend yet.</p>
            </div>
          )}
        </div>
        <div className={Style.Friend_box_right}>
          <Chat
            functionName={sendMessage}
            readMessage={readMessage}
            friendMsg={friendMsg}
            account={account}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
            currentUserAddress={currentUserAddress}
            readUser={readUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Friend;
