import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import NoUser from "../../../assets/nousser.svg";
import Link from "next/link";
import Style from "./Chat.module.css";
import images from "../../../assets";
import { converTime } from "../../../Utils/apiFeature";
import { Loader } from "../../index";

const Chat = ({
  functionName,
  readMessage,
  friendMsg,
  readUser,
  account,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
}) => {
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({ name: "", address: "" });
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setChatData(router.query);
  }, [router.isReady]);

  useEffect(() => {
    if (chatData.address) {
      reloadData();
    }
  }, []);

  const reloadData = () => {
    if (chatData.address) {
      readMessage(chatData.address);
      readUser(chatData.address);
    }
  };

  const sendMessage = async () => {
    await functionName({ msg: message, address: chatData.address });
    reloadData();
  };

  return (
    <div className={Style.Chat}>
      {currentUserName && currentUserAddress ? (
        <div className={Style.Chat_user_info}>
          <Image src={images.accountName} alt="image" width={70} height={70} />
          <div className={Style.Chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <p className={Style.show}>{currentUserAddress}</p>
          </div>
        </div>
      ) : (
        <div className={Style.noUser}>
          <Image src={NoUser} alt="User not found" />
          <h2>User not available</h2>
          <p>
            Be the first to join! Create an account now and start interacting
            with the community.
          </p>
        </div>
      )}

      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
            {friendMsg.map((el, i) => (
              <div key={i + 1} className={Style.Chat_box_Container}>
                {el.sender == chatData.address ? (
                  <div className={Style.Chat_box_left_title}>
                    <Image
                      src={images.accountName}
                      alt="image"
                      width={50}
                      height={50}
                    />
                    <span>
                      {chatData.name} {""}
                      <small>Time: {converTime(el.timestamp)}</small>
                    </span>
                  </div>
                ) : (
                  <div className={Style.Chat_box_left_title}>
                    <Image
                      src={images.accountName}
                      alt="image"
                      width={30}
                      height={30}
                    />
                    <span>{userName}</span>
                  </div>
                )}
                <div className={Style.Chat_box_left_message_box}>
                  <p key={i + 1}>{el.msg}</p>
                  <div className={Style.Chat_box_left_message_box_time}>
                    <small>{converTime(el.timestamp)}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {currentUserName && currentUserAddress ? (
          <div className={Style.Chat_box_send}>
            <div className={Style.Chat_box_send_img}>
              <Image src={images.smile} alt="smile" width={40} height={40} />
              <input
                type="text"
                placeholder="type your message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <Image src={images.file} alt="file" width={40} height={40} />
              {loading == true ? (
                <Loader />
              ) : (
                <Image
                  src={images.send}
                  alt="send"
                  width={40}
                  height={40}
                  onClick={() => sendMessage()}
                />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Chat;
