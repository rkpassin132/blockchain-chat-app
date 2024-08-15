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

  const showError = (error) => {
    setError(error);
    setTimeout(() => {
      setError("");
    }, 4000);
  };

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
        showError(`Wrong network or user (${connectAccount}) not found.`);
        return;
      }
      setUserName(userName);

      const friendLists = await contract.getMyFriendList();
      setFriendLists(friendLists);

      const userList = await contract.getAllAppUser();
      setUserLists(userList);
    } catch (error) {
      console.log(error);
      showError("Please install and connect your wallet");
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
      // showError("Currently you have no message");
    }
  };

  const createAccount = async ({ name, accountAddress }) => {
    try {
      if (!name && !accountAddress) {
        return showError("Name and accountAddress, cannot be empty");
      }
      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      showError("Error while creating your account. Please reload browser");
    }
  };

  const addFriends = async ({ name, accountAddress }) => {
    try {
      // if (!name && !accountAddress)
      //   return showError("Please provide name and account address");
      const contract = await connectingWithContract();
      const addMyFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      showError("These users are already friends");
    }
  };

  const sendMessage = async ({ msg, address }) => {
    try {
      if (!msg && !address) return showError("Please type your message");
      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(address, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      // window.location.reload();
    } catch (error) {
      console.log(error);
      showError("Please reload and try again");
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
