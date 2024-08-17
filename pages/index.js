import React, { useEffect, useState, useContext } from "react";
import { ChatAppContext } from "../Context/ChatAppContext";
import { Filter, Friend } from "../components/index";

const Home = () => {
  const { friendLists } = useContext(ChatAppContext);
  const [friendListFiltered, setFriendListFiltered] = useState(friendLists);

  useEffect(() => setFriendListFiltered(friendLists), [friendLists]);

  return (
    <div>
      <Filter
        setFriendListFiltered={setFriendListFiltered}
        friendLists={friendLists}
      />
      <Friend friendLists={friendListFiltered} />
    </div>
  );
};

export default Home;
