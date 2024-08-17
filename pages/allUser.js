import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Style from "../styles/allUser.module.css";
import { ChatAppContext } from "../Context/ChatAppContext";
import UserCard from "../components/UserCard/UserCard";
import NoUser from "../assets/nousser.svg";

const AllUser = () => {
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
      {userList && userList?.length ? (
        <div className={Style.alluser}>
          {userList.map((el, i) => (
            <UserCard key={i + 1} el={el} i={i} addFriends={addFriends} />
          ))}
        </div>
      ) : (
        <div className={Style.noUser}>
          <Image src={NoUser} alt="User not found" />
          <h2>User not available</h2>
          <p>
            No users are visible yet. Join the app and create your account to
            start connecting with others!
          </p>
        </div>
      )}
    </div>
  );
};

export default AllUser;
