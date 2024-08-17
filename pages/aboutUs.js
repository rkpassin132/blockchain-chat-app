import React from "react";
import Image from "next/image";
import styles from "../styles/aboutUs.module.css";
import HeroSection from "../components/HeroSection/HeroSection";
import AboutImage from "../assets/about.svg";

const about = () => {
  return (
    <div className={styles.container}>
      <HeroSection
        heading="Decentralized Messaging for the Modern World"
        discription="Embrace secure and private messaging with our blockchain-powered chat app. Your conversations are protected with advanced encryption, ensuring that only you and your intended recipients can access your messages. With blockchain technology, your data is decentralized and immune to central points of failure, offering unparalleled security and privacy."
        image={AboutImage}
      />
      <div className={styles.detail}>
        <h1>How to Use the Chat App</h1>
        <ol>
          <li>
            <strong>Connect Your Wallet</strong>
            <br />
            Open the app and link your blockchain wallet (e.g., MetaMask).
            Authorize the connection.
          </li>
          <li>
            <strong>Create Your Account</strong>
            <br />
            Your wallet address will automatically be used to create your
            account.
          </li>
          <li>
            <strong>Add Friends</strong>
            <br />
            Go to the "All Users" tab. Search for friends and send them a friend
            request.
          </li>
          <li>
            <strong>Start Chatting</strong>
            <br />
            Navigate to the "Chat" section. Select a friend from your list. Type
            and send messages in the chat window.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default about;
