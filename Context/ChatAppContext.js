import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  CheckIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  // Chat user data
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  // fetch data time of page load
  const fetchData = async () => {
    try {
      const contract = await connectingWithContract();
      const connectAccount = await connectWallet();

      if (!contract || !connectAccount) {
        throw new Error("Contract or account not found");
      }
      setAccount(connectAccount);

      const userName = await contract
        .getUsername(connectAccount)
        .catch((error) => {
          console.error("Failed to fetch username:", error);
          return null;
        });

      if (!userName) {
        setError(`Wrong network or user (${connectAccount}) not found.`);
        return;
      }
      setUserName(userName);

      const friendLists = await contract.getMyFriendList();
      setFriendLists(friendLists);

      const userList = await contract.getAllAppUser();
      setUserLists(userList);
    } catch (error) {
      console.log(error);
      setError("Please install and connect your wallet");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const readMessage = async (friendAddres) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddres);
      setFriendMsg(read);
    } catch (error) {
      console.log(error);
      setError("Currently you have no message");
    }
  };

  const createAccount = async ({ name, accountAddress }) => {
    try {
      if (!name && !accountAddress) {
        return setError("Name and accountAddress, cannot be empty");
      }
      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Error while creating your account. Please reload browser");
    }
  };

  const addFriends = async ({ name, accountAddress }) => {
    try {
      if (!name && !accountAddress)
        return setError("Please provide name and account address");
      const addMyFriend = await ContractFactory.addFriend(accountAddress, name);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError("Something went wrong while adding friend");
    }
  };

  const sendMessage = async ({ msg, address }) => {
    try {
      if (!msg && !address) return setError("Please type your message");
      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(address, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError("Please reload and try again");
    }
  };

  const readUser = async (userAddress) => {
    const contract = await connectingWithContract();
    const userName = await contract.getUsername(userAddress);
    setCurrentUserName(userName);
    setCurrentUserAddress(userAddress);
  };

  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        CheckIfWalletConnected,
        connectWallet,
        account,
        userName,
        friendLists,
        friendMsg,
        loading,
        userLists,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
