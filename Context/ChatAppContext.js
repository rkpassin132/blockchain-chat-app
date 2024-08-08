import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  CheckIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  const title = "Blockchain Chat App";

  return (
    <ChatAppContext.provider value={{ title }}>
      {children}
    </ChatAppContext.provider>
  );
};
