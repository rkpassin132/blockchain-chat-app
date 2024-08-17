import chatAppJSON from "../artifacts/contracts/ChatApp.sol/ChatApp.json";
import chatAppJSONProd from "../Context/ChatAppAbi.json"; // Production Testnet deployed ABI

export const enviroment = process.env.NEXT_PUBLIC_ENVIRONMENT;
export const ChatAppAddress = process.env.NEXT_PUBLIC_CHAT_APP_ADDRESS;
export const ChatAppABI =
  enviroment == "local" ? chatAppJSON.abi : chatAppJSONProd;
