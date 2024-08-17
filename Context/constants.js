// import chatAppJSON from "../artifacts/contracts/ChatApp.sol/ChatApp.json";
import chatAppJSONProd from "../Context/ChatAppAbi.json"; // Production Testnet deployed ABI

export const enviroment = process.env.NEXT_PUBLIC_ENVIRONMENT;
export const ChatAppAddress = "0xdf2cBf666d4cffBC2F373C5068C72E607aFF9531";
export const ChatAppABI = enviroment == chatAppJSONProd;
