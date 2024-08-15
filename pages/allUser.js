import React, { useState, useEffect, useContext } from "react";
import Style from "../styles/allUser.module.css";
import { ChatAppContext } from "../Context/ChatAppContext";
import UserCard from "../components/UserCard/UserCard";

const allUser = () => {
  const { userName, userLists, addFriends } = useContext(ChatAppContext);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const users = userLists.filter((el) => el.name != userName);
    setUserList(users);
  }, [userLists]);

  return (
    <div>
      <div className={Style.alluser_info}>
        <h1>Find Your Friends</h1>
      </div>
      <div className={Style.alluser}>
        {userList.map((el, i) => (
          <UserCard key={i + 1} el={el} i={i} addFriends={addFriends} />
        ))}
      </div>
    </div>
  );
};

export default allUser;
