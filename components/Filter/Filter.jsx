import React, { useState, useContext } from "react";
import Image from "next/image";

import Style from "./Filter.module.css";
import images from "../../assets";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model } from "../index";

const Filter = ({ setFriendListFiltered, friendLists }) => {
  const { account, addFriends } = useContext(ChatAppContext);
  const [addFriend, setAddFriend] = useState(false);

  const filterFirend = (text) => {
    const searchText = (text || "").toLowerCase();
    let friends = (friendLists || [])?.filter((el) =>
      el.name.toLowerCase().includes(searchText)
    );
    setFriendListFiltered(friends);
  };
  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={20} height={20} />
            <input
              type="text"
              placeholder="Search.."
              onChange={(e) => filterFirend(e.target.value)}
            />
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.user} alt="add user" width={20} height={20} />
            ADD FRIEND
          </button>
        </div>
      </div>

      {/* Model component */}
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model
            openBox={setAddFriend}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, beatae voluptates temporibus delectus blanditiis quaerat pariatur praesentium itaque odit unde incidunt excepturi sunt asperiores enim molestias, repellendus aliquam alias amet."
            smallInfo="Kindly Select Your Friend Name & Address"
            image={images.hero}
            functionName={addFriends}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
